"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
exports.event = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user?.username} is ready.`);
        console.log("-----------------------------------------------------");
        const rest = new rest_1.REST({
            version: '9',
        }).setToken(process.env.BOT_TOKEN);
        const USER_ID = client.user?.id;
        const command = client.commands.map((m) => m.data);
        (async () => {
            try {
                if (process.env.STATUS === 'production') {
                }
                else {
                    await rest.put(v9_1.Routes.applicationGuildCommands(USER_ID, process.env.GUILD_ID), {
                        body: command,
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        })();
    },
};
