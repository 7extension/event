"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (!interaction.inGuild())
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            await command?.run(interaction);
        }
        catch (err) {
            if (err)
                console.log(err);
            await interaction.reply({
                content: 'An error occured while executing that command.',
                ephemeral: true,
            });
        }
    },
};
