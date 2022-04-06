module.exports = {
	name: 'hi',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('HAIII');
	},
};