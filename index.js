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

function loadHandlers() {
	['command', 'slashCommand', 'event', 'config'].forEach(handler => {
		try {
			require(`./handlers/${handler}`)(client);
		} catch (e) {
			console.log(e.stack);
		}
	});

	if (process.argv.includes('-init')) {
		['deployCommands', 'dbinit'].forEach(handler => {
			try {
				require(`./handlers/${handler}`)(client);
			} catch (e) {
				console.log(e.stack);
			}
		});
	}
} loadHandlers();

/** *************************************************
 * Login to Discord
 ***************************************************/

client.login(process.env.BOT_TOKEN);