const moment = require('moment');

module.exports = {
    name: 'absen',
    description: 'hanya absen',
    cooldown: 60,
    execute(message, args) {
        message.channel.send(`${message.author}, kamu berhasil absen pada ${moment().tz('Asia/Jakarta').format('LLLL')}.`);
    },
};