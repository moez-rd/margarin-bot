const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Lagy nge-*ping*...', fetchReply: true });
		interaction.editReply(`Pong!: Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};