const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const config = require('./config.json');
require('dotenv').config();


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false
	}
})

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	Tags.sync();
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('message', async message => {
	if (message.content.startsWith(config.prefix) || message.author.bot) {
		const input = message.content.slice(config.prefix.length).trim().split(' ');
		const command = input.shift();
		const commandArgs = input.join(' ');

		if (command === 'addtag') {
			const splitArgs = commandArgs.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			try {
				const tag = await Tags.create({
					name: tagName,
					description: tagDescription,
					username: message.author.username
				});
				return message.reply(`Tag ${tagName} added.`);
			} catch (error) {
				if (error.name === 'SequelizeUniqueConstraintError') {
					return message.reply('That tag already exists');
				}
				return message.reply('Something went wrong with adding a tag');
			}

		} else if (command === 'tag') {
			const tagName = commandArgs;

			const tag = await Tags.findOne({ where: { name: tagName } });
			if (tag) {
				tag.increment('usage_count');
				return message.channel.send(tag.get('description'));
			}
			return message.reply(`Could not find tag: ${tagName}`);
		} else if (command === 'edittag') {
			const splitArgs = commandArgs.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
			if (affectedRows > 0) {
				return message.reply(`Tag ${tagName} was edited`);
			}
			return message.reply(`Could not find tag with name ${tagName}`)
		} else if (command === 'taginfo') {
			const tagName = commandArgs

			const tag = await Tags.findOne({ where: { name: tagName } });
			if (tag) {
				return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
			}
			return message.reply(`Could not find tag: ${tagName}`);

		} else if (command === 'showtags') {
			const tagList = await Tags.findAll({ attributes: ['name'] });
			const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
			return message.channel.send(`List of tags: ${tagString}`);
		} else if (command === 'removetag') {
			const tagName = commandArgs;
			const rowCount = await Tags.destroy({ where: { name: tagName } });
			if (!rowCount) {
				return message.reply('That tag did not exist');
			}
			return message.reply('Tag deleted')
		}
	}
});

client.on('message', message => {
	if (message.author.bot) return;

	const greetings = ['hi', 'hai', 'halo', 'haloo', 'hello', 'helo', 'hay', 'hello', 'hallo', 'hey', 'hola', 'ohayo', 'oi', 'oyy', 'oy'];
	const answers = [
		`Halo ${message.author}, semoga harimu menyenangkan :v`,
		'Hai masyarakat NgodingVareng',
		`HALOOO ${message.author}, kamu siapahh?`,
		`${message.author}, dak peduli:v`,
		`HAI ${message.author}`,
		`HAI ${message.author}, sehatkah dirimu?`,
		`Halo ${message.author}, semoga cepat waras!:v`
	]

	greetings.forEach(greeting => {
		if (message.content.toLowerCase().includes(greeting)) {
			message.react('🖐️');
			return message.channel.send(answers[Math.floor(Math.random() * answers.length)]);
		}
	});
})

client.login(process.env.TOKEN);