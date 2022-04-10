const { readdirSync } = require('node:fs');
const { Collection } = require('discord.js');

module.exports = client => {
	client.slashCommands = new Collection();

	readdirSync('./slashCommands').forEach((folder) => {
		const slashCommandFiles = readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of slashCommandFiles) {
			const slashCommand = require(`../slashCommands/${folder}/${file}`);
			client.slashCommands.set(slashCommand.data.name, slashCommand);
		}
	});
};