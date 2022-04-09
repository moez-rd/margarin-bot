const fs = require('node:fs');
const { Collection, Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
// const { slashCommandsDir } = require('./config.json');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const slashCommandFolders = fs.readdirSync('./slashCommands');
const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// Set commands in the client.commands
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Set slashCommands in the client.slashCommands
for (const folder of slashCommandFolders) {
	const slashCommandFiles = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashCommandFiles) {
		const slashCommand = require(`./slashCommands/${folder}/${file}`);
		client.slashCommands.set(slashCommand.data.name, slashCommand);
	}
}

// Execute events
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);