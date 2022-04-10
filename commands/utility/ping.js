module.exports = {
	name: 'ping',
	description: 'Just ping.',
	withPrefix: true,
	execute(message) {
		// Ini ado masalah
		const sent = message.reply({ content: 'Lagy nge-*ping*...', fetchReply: true });
		message.reply(`Pong!: Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
	},
};