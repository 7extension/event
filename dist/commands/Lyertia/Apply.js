"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const builders_1 = require("@discordjs/builders");
const { Modal, TextInputComponent, showModal } = require('discord-modals');
exports.command = {
    data: new builders_1.SlashCommandBuilder().setName('event').setDescription('Zgłoszenie do eventu'),
    run: async (interaction) => {
        const form = new Modal()
            .setCustomId('application' + interaction.user.id)
            .setTitle('Tutaj możesz się zgłosić do eventu chowanego valorant!')
            .addComponents(new TextInputComponent()
            .setCustomId('question1' + interaction.user.id)
            .setLabel('Nick oraz tag w Valorancie')
            .setStyle('LONG') // SHORT or LONG
            .setMinLength(4)
            .setMaxLength(120)
            .setPlaceholder('nick#tag')
            .setRequired(true));
        /// you can add more questions here
        showModal(form, {
            client: interaction.client,
            interaction: interaction,
        });
    },
};
