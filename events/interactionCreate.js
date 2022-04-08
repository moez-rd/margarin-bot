const chalk = require('chalk');

const log = console.log;

module.exports = {
	name: 'interactionCreate',
	execute(client, interaction) {
		log(`${chalk.yellow.bold(interaction.user.tag)} in ${chalk.yellow.bold(`#${interaction.channel.name}`)}triggered an interaction.`);

		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		command.execute(interaction)
			.catch((error) => {
				console.error(error);
				// ephermeral -> Hide messages from everyone
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			});
	},
};