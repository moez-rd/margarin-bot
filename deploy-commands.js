const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();

const commands = [];
const commandFolders = fs.readdirSync('./slashCommands');
const log = console.log;

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./slashCommands/${folder}/${file}`);
		commands.push(command.data.toJSON());

	}
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

// For guild commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(() => log(chalk.blue('Successfully registered application commands.')))
	.catch(console.error);

// For global commands
// rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
// 	.then(() => log(chalk.blue('Successfully registered application commands.')))
// 	.catch(console.error);