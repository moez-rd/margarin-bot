const { readdirSync } = require('node:fs');

module.exports = client => {
	readdirSync('./events').filter(file => file.endsWith('.js')).forEach((file) => {
		const event = require(`../events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
	});


};