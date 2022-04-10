const { readdirSync } = require('node:fs');
const { Collection } = require('discord.js');

module.exports = (client) => {
	client.commands = new Collection();
	client.cooldowns = new Collection();

	readdirSync('./commands/').forEach((folder) => {
		const commandFiles = readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	});
};