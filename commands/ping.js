const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply();
		// await interaction.reply('Pong!');
		await wait(4000);
		await interaction.editReply('Pong again!');
		// await interaction.followUp('Pong again!');
	},
};