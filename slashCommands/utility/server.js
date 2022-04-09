const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		await interaction.reply(`
**ID server**: ${interaction.guild.id}
**Nama server**: ${interaction.guild.name}
**Total masyarakat**: ${interaction.guild.memberCount}
**Tanggal dibuat**: ${interaction.guild.createdAt}
		`);
	},
};