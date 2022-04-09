const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const chalk = require('chalk');
const { slashCommandsDir } = require('./config.json');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync(slashCommandsDir).filter(file => file.endsWith('.js'));
const log = console.log;

for (const file of commandFiles) {
	const command = require(`${slashCommandsDir}/${file}`);
	commands.push(command.data.toJSON());
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