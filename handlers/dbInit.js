const { readdirSync } = require('node:fs');
const Sequelize = require('sequelize');

module.exports = () => {
	const sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		storage: 'databases/database.sqlite',
	});

	readdirSync('./models/').filter(file => file.endsWith('.js')).forEach((file) => {
		require(`../models/${file}`)(sequelize, Sequelize.DataTypes);
	});

	const force = process.argv.includes('--force') || process.argv.includes('-f');

	sequelize.sync({ force })
		.then(async () => {
			console.log('Database synced');
			sequelize.close();
		}).catch(console.error);
};