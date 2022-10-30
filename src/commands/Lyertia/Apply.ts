import { Command } from '../../interfaces'
import { SlashCommandBuilder } from '@discordjs/builders'
const { Modal, TextInputComponent, showModal } = require('discord-modals')

export const command: Command = {
  data: new SlashCommandBuilder().setName('event').setDescription('Zgłoszenie do eventu'),
  run: async (interaction) => {
    const form = new Modal()
      .setCustomId('application' + interaction.user.id)
      .setTitle('Event chowanego Valorant')
      .addComponents(
        new TextInputComponent()
        .setCustomId('question1' + interaction.user.id)
        .setLabel('Nick oraz tag w Valorancie')
        .setStyle('LONG') // SHORT or LONG
        .setMinLength(4)
        .setMaxLength(120)
        .setPlaceholder('nick#tag')
        .setRequired(true)
    )

    /// you can add more questions here

    showModal(form, {
      client: interaction.client,
      interaction: interaction,
    })
  },
}
