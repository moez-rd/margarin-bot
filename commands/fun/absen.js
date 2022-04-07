module.exports = {
    name: 'absen',
    description: 'hanya absen',
    execute(message, args) {
        const datetime = new Date();
        message.channel.send(`${message.author}, kamu berhasil absen pada ${datetime.getMinutes}:${datetime.getHours}`);
    },
};