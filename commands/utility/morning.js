const cron = require('cron');
const Discord = require('discord.js');

module.exports = {
    name: 'morning',
    description: 'Morning reminder',
    execute(message, args) {
        let scheduledMessage = new cron.CronJob('00 00 06 * * *', () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#8FBDD3')
                .setTitle('Selamat pagy masyarakat')
                .attachFiles(['assets/img/pagy.jpg'])
                .setImage('attachment://pagy.jpg');

            message.channel.send(embed);
        }, null, true, 'Asia/Jakarta');
        if (args[0] == 'start') {
            if (!scheduledMessage.running) {
                scheduledMessage.start()
                return message.channel.send('Pengingat pagy dibuat.')
            } else {
                return message.channel.send('Pengingat pagy sudah dijalankan sebelumnya.')
            }
        }

        if (args[0] == 'stop') {
            if (scheduledMessage.running) {
                scheduledMessage.stop()
                return message.channel.send('Pengingat pagy dihentikan.')
            } else {
                return message.channel.send('Pengingat pagy tidak dijalankan sebelumnya.')
            }
        }
    },
};