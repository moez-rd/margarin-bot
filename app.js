const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.on('ready', () => console.log('The Bot is ready!'));

const hiMessages = ['hi', 'hai', 'halo', 'hallo', 'hei'];

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            message.channel.send('pong')
            break;
        case 'server':
            message.channel.send(`Ketahuilah! nama server ini tak lain merupakan **${message.guild.name}**:).\nJumlah penumpang sebanyak sebanyak **${message.guild.memberCount}** orang.`)
        default:
            break;
    }
});

client.on('message', message => {
    if (hiMessages.includes(message.content)) {

    }
})

client.login(token);