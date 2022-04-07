const cron = require('cron');
const Discord = require('discord.js');

module.exports = {
    name: 'morning',
    description: 'Morning reminder',
    execute(message, args) {
        let scheduledMessage = new cron.CronJob('00 59 09 * * *', () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#8FBDD3')
                .setTitle('Selamat pagy masyarakat NgodingVareng')
                .setDescription('Semoga harimu menyenangkan')

            message.channel.send(embed);
        }, null, true, 'Asia/Jakarta');
        if (args[0] == 'start') {
            scheduledMessage.start()
            return message.channel.send('Pengingat pagy dibuat')
        }

        if (args[0] == 'stop') {
            scheduledMessage.stop()
            return message.channel.send('Pengingat pagy dihentikan')
        }
    },
};