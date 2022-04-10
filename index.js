const { readdirSync } = require('node:fs');
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

/** *************************************************
 * Create The Discord Bot Client
 ***************************************************/

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


/** *************************************************
 * Load The Bot Functions
 ***************************************************/

const handlerFiles = readdirSync('./handlers').filter(file => file.endsWith('.js'));

function loadHandlers() {
	for (const handler of handlerFiles) {
		require(`./handlers/${handler}`)(client);
	}
} loadHandlers();

/** *************************************************
 * Login to Discord
 ***************************************************/

client.login(process.env.BOT_TOKEN);