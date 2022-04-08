module.exports = {
	name: 'hi',
	description: 'Ping!',
	execute(message, args) {
		const tagName = args.shift();
		const tagDescription = args.join(' ');

		const tag = this.database.Tags.create({
			name: tagName,
			description: tagDescription,
			username: message.author.username,
			gulid_id: message.guild.id
		}).then(() => {
			return message.reply(`Tag ${tagName} added.`);
		}).catch((error) => {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That tag already exists');
			}
			return message.reply(`Something went wrong with adding a tag ${error.name}`);
		});
	},
};