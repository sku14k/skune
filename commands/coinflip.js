const Discord = require('discord.js');

module.exports = {
	name: "coinflip",
	async execute(message, args) {
        var choices = [
            "тоо", 
            "сүлд"
        ];

        var output = choices[Math.floor(Math.random()*choices.length)];

        message.reply({
            embed: {
                title: `Зоос шидэх`,
                color: '#679ad8',
                description: `\`\`\`${message.author.tag} та ${output} буулгалаа\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 30000})).then(message.delete({timeout: 30000}));
    }
}