module.exports = {
	name: 'server',
	description: 'Server info',
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`Ketahuilah! nama server ini tak lain merupakan **${message.guild.name}**:).\nJumlah penumpang sebanyak sebanyak **${message.guild.memberCount}** orang.`)
	},
};