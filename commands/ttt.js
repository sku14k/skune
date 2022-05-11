const { TicTacToe } = require('discord-gamecord')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ttt',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}ttt [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        new TicTacToe({
            message: message,
            slash_command: false,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Tic Tac Toe',
                overTitle: 'Тоглолт дууслаа',
                color: '#679ad8',
            },
            oEmoji: '<:ttto:912207766540656650>',
            xEmoji: '<:tttx:912207749792813096>',
            blankEmoji: '➖',
            oColor: 'PRIMARY',
            xColor: 'DANGER',
            waitMessage: 'Хэрэглэгчийг хүлээж байна...',
            turnMessage: '{emoji} | {player} хэрэглэгчийн ээлж',
            askMessage: 'Хэрэглэгч {opponent}, {challenger} хэрэглэгч таныг Tic Tac Toe тоглохыг урьж байна',
            cancelMessage: '{opponent} хэрэглэгч таны урилгийг цуцаллаа',
            othersMessage: 'Таныг уриагүй тул тоглох боломжгүй',
            timeEndMessage: 'Хэрэглэгч хариулт өгөөгүй тул цуцаллаа',
            drawMessage: 'Тэнцлээ',
            winMessage: '{emoji} | {winner} хэрэглэгч хожлоо',
            gameEndMessage: 'Хэрэглэгчид тоглолтоо дуусгасангүй',
        }).startGame();
    }
}