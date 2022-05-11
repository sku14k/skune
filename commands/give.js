const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    name: 'give',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        let user = message.mentions.members.first()

        let member = db.fetch(`money_${message.author.id}`)

        let embed1 = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${prefix}give [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)

        if (!user) {
            return message.channel.send({ embeds: [embed1] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        let embed2 = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${prefix}give [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)

        if (!args[1]) {
            return message.channel.send({ embeds: [embed2] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        let embed3 = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Хэрэглэгчрүү шилжүүлэх skune зоосын утга натурал тоо байх ёстой.\`\`\``)

        if (message.content.includes('-')) {
            return message.channel.send({ embeds: [embed3] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
        let embed4 = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Танд хэрэглэгчрүү шилжүүлэх хангалттай skune зоос байхгүй байна.\`\`\``)

        if (member < args[1]) {
            return message.channel.send({ embeds: [embed4] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        let embed5 = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Та ${user.user.username} хэрэглэгчрүү ${args[1]} skune зоос шилжүүллээ.\`\`\``)

        message.channel.send({ embeds: [embed5] })
        db.add(`money_${user.id}`, args[1])
        db.subtract(`money_${message.author.id}`, args[1])

    }
}