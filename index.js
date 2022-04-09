const fs = require('node:fs');
const { Collection, Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const { slashCommandsDir } = require('./config.json');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commandFiles = fs.readdirSync(slashCommandsDir).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`${slashCommandsDir}/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

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