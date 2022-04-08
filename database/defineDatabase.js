const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database/database.sqlite',
});

module.exports = {
    Tags: sequelize.define('tags', {
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
        },
        gulid_id: Sequelize.STRING
    }),
    Matkul: sequelize.define('mata_kuliah', {
        name: Sequelize.STRING,
        class: Sequelize.STRING,
        lecturer: Sequelize.STRING,
    }),
    Task: sequelize.define('task', {
        name: Sequelize.STRING,
        description: Sequelize.TEXT
    })
}