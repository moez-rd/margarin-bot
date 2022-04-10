module.exports = {
	name: 'hi',
	aliases: ['hai', 'halo', 'haloo', 'hello', 'helo', 'hay', 'hello', 'hallo', 'hey', 'hola', 'ohayo', 'oi', 'oyy', 'oy', 'hoy', 'huy', 'hoi', 'hoyy'],
	description: 'Greeting',
	execute(message) {
		const answers = [
			`Halo ${message.author}, semoga harimu menyenangkan :v`,
			'Hai masyarakat NgodingVareng',
			`HALOOO ${message.author}, kamu siapahh?`,
			`${message.author}, dak peduli:v`,
			`HAI ${message.author}`,
			`HAI ${message.author}, sehatkah dirimu?`,
			`Halo ${message.author}, semoga cepat waras!:v`,
			`Iya ada apa ${message.author}`,
		];

		message.react('🖐️');
		return message.channel.send(answers[Math.floor(Math.random() * answers.length)]);
	},
};