const { RockPaperScissors } = require('discord-gamecord')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'rps',
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
                .setDescription(`\`\`\`${prefix}rps [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        new RockPaperScissors({
            message: message,
            slash_command: false,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Хайч чулуу даавуу',
                description: 'Сонголтоо хийгээрэй',
                color: '#679ad8',
            },
            buttons: {
                rock: 'Чулуу',
                paper: 'Цаас',
                scissors: 'Хайч',
            },
            emojis: {
                rock: '🪨',
                paper: '📃',
                scissors: '✂️',
            },
            othersMessage: 'Таныг уриагүй тул тоглох боломжгүй',
            chooseMessage: 'Та {emoji} сонголоо!',
            noChangeMessage: 'Та сонголтоо өөрчлөх боломжгүй',
            askMessage: 'Хэрэглэгч {opponent}, {challenger} хэрэглэгч таныг хайч чулуу даавуу тоглохыг урьж байна',
            cancelMessage: '{opponent} хэрэглэгч таны урилгийг цуцаллаа',
            timeEndMessage: 'Хэрэгэлэгч хариулт өгөөгүй тул цуцаллаа',
            drawMessage: 'Тэнцлээ',
            winMessage: '{winner} хэрэглэгч хожлоо',
            gameEndMessage: 'Хэрэглэгчид тоглолтоо дуусгасангүй',
        }).startGame();
    }
}
