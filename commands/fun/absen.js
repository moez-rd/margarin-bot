module.exports = {
    name: 'absen',
    description: 'hanya absen',
    cooldown: 60,
    execute(message, args) {
        const datetime = new Date();
        message.channel.send(`${message.author}, kamu berhasil absen pada jam ${datetime.getHours()} lewat ${datetime.getMinutes()}.`);
    },
};