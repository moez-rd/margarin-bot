const { readdirSync } = require('node:fs');

module.exports = client => {
	client.config = {};

	const configs = readdirSync('./config');
	for (const config of configs.filter(file => file.endsWith('.json'))) {
		client.config[`${config.split('.json').join('')}`] = require(`../config/${config}`);
	}
	Object.freeze(client.config);
	console.log('Config loaded');
};