const chalk = require('chalk');

const log = console.log;

module.exports = {
	name: 'ready',
	once: true,
	execute(Tags, client) {
		log(chalk.blue(`${chalk.bgBlue('Ready!')} Logged in as ${chalk.bold(client.user.tag)}`));
	},
};