"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../utils/string.extensions");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const discordModals = require('discord-modals');
const { format, parse } = require('date-and-time');
const config_1 = __importDefault(require("../config"));
class InfernoClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    aliases = new discord_js_1.Collection();
    constructor() {
        super({
            intents: [
                [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.DIRECT_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
            ],
            presence: {
                status: 'idle',
                activities: [{ name: '<33', type: 'STREAMING', url: 'https://twitch.tv/pikachu2115' }],
            },
            partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
        });
    }
    async init() {
        /* Commands */
        const commandPath = path_1.default.join(__dirname, '..', 'commands');
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            const commands = (0, fs_1.readdirSync)(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.data.name, command);
            }
        });
        /* Events */
        const eventPath = path_1.default.join(__dirname, '..', 'events');
        (0, fs_1.readdirSync)(eventPath).forEach(async (file) => {
            const { event } = await Promise.resolve().then(() => __importStar(require(`${eventPath}/${file}`)));
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
        this.login(config_1.default.BOT_TOKEN);
        discordModals(this);
        this.on('modalSubmit', (modal) => {
            const logs = this.channels.cache.get(config_1.default.APPLICATIONS_LOG_CHANNEL);
            if (!logs)
                return console.log('Cannot find log channel');
            const answer1 = modal.getTextInputValue('question1' + modal.user.id);
            //if you added more questions, you can add them answers here
            // modal.reply('Dziekujemy za zlozenie wniosku! Rozpatrzymy go najszybciej jak bedzie to mozliwe.', true)
            let result = `**nick#tag:** ${answer1}`;
            console.log(format(new Date(), 'YYYY/MM/DD HH:mm') + result.replaceAll('**', ' '));
            console.log('-----------------------------------------------------');
            if (result.length > 2040) {
                result =
                    'Aplikacja jest za d??uga zobacz konsole.';
                console.log('^^^^ Nie mo??na wys??a?? wiadomo??ci, wyslano w konsoli ^^^^');
                console.log('-----------------------------------------------------');
            }
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Zgloszenie od: ' + modal.user.tag)
                .setDescription(result)
                .setTimestamp()
                .setFooter({ text: 'KindergartenSupport' })
                .setColor('RANDOM');
            logs.send({ embeds: [embed] });
        });
    }
}
exports.default = InfernoClient;
