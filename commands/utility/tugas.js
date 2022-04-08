module.exports = {
    name: 'absen',
    description: 'hanya absen',
    cooldown: 60,
    execute(message, args) {
        moment.locale('id');
        message.channel.send(`${message.author}, kamu berhasil absen pada ${moment().tz('Asia/Jakarta').format('LLLL')}.`);
    },
}