const { MessageEmbed } = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'rank',
    async execute(client, message, args) {
        xp(message)

        if (message.author.bot) return
        var user = message.mentions.members.first() || message.author
        var level = db.fetch(`level_${user.id}`) || 0
        var currentxp = db.fetch(`xp_${user.id}`) || 0
        var xpNeeded = level * 500 + 500
        const embedlvl = new MessageEmbed()
            .setColor('#679ad8')
            .setTitle(`${user.username} хэрэглэгчийн түвшин`)
            .addFields(
                { name: 'XP', value: `${currentxp}/${xpNeeded}`, inline: true },
                { name: 'Түвшин', value: `${level}`, inline: true }
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        message.channel.send({ embeds: [embedlvl] })

        function xp(message) {
            if (message.author.bot) return
            const randomNumber = Math.floor(Math.random() * 50) + 100
            db.add(`xp_${message.author.id}`, randomNumber)
            db.add(`xptotal_${message.author.id}`, randomNumber)
            var level = db.get(`level_${message.author.id}`) || 1
            var xp = db.get(`xp_${message.author.id}`)
            var xpNeeded = level * 500
            if (xpNeeded < xp) {
                var newLevel = db.add(`level_${message.author.id}`, 1)
                db.subtract(`xp_${message.author.id}`, xpNeeded)
                const levelUp = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Баяр хүргэе ${message.author.tag}! Та түвшин нэмлээ, таны түвшин ${newLevel}\`\`\``)
                message.channel.send({ embeds: [levelUp] })
            }
        }
    }

}