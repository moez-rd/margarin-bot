const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	type: 'slash',
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
	async execute(interaction) {
		await interaction.reply(`
**Tag**: ${interaction.user.tag}
**ID**: ${interaction.user.id}
        `);
	},
};