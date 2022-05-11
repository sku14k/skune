const Discord = require('discord.js')
const { Connect4 } = require('discord-gamecord')
const db = require('quick.db')

module.exports = {
    name: 'c4',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.mentions.members.first()) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}c4 [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        new Connect4({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Connect 4',
                color: '#679ad8',
            },
            emojis: {
                player1: '🔵',
                player2: '🟡'
            },
            turnMessage: '{emoji} | {player} хэрэглэгчийн ээлж',
            winMessage: '{emoji} | {winner} хэрэглэгч хожлоо!',
            gameEndMessage: 'Тоглолт дууссангүй',
            drawMessage: 'Тэнцлээ!',
            askMessage: 'Хэрэглэгч {opponent}, {challenger} хэрэглэгч таныг Connect 4 тоглохыг урьж байна.',
            cancelMessage: '${opponent} цуцаллаа',
            timeEndMessage: '${opponent} хэрэглэгч хариу өгөөгүй тул цуцлагдлаа',
        }).startGame();
    },
};