const chalk = require('chalk');
const { prefix } = require('../config.json');

const log = console.log;

module.exports = {
	name: 'messageCreate',
	execute(client, message) {
		if (message.author.bot) return;

		if (message.content.startsWith(prefix)) {

			log(`${chalk.yellow.bold(message.author.tag)} in ${chalk.yellow.bold(`#${message.channel.name}`)} triggered a prefixed message.`);

			const args = message.content.slice(prefix.length).trim().split(/ +/);
			const command = args.shift().toLowerCase();

			if (command === 'ping') {
				message.channel.send('Pong.');
			} else if (command === 'beep') {
				message.channel.send('Boop.');
			}
		} else {
			log(`${chalk.yellow.bold(message.author.tag)} in ${chalk.yellow.bold(`#${message.channel.name}`)} triggered a message.`);

		}
	},
};