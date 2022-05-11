const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'rbal',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        let ownerID = '285098453808447490'
        if (message.author.id !== ownerID) {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд rbal командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        let user = message.mentions.members.first() || message.author

        if (isNaN(args[1])) {
            const numberEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}rbal [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [numberEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        db.subtract(`money_${user.id}`, args[1])
        let bal = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${args[1]} skune зоос хураалаа.\nОдоо байгаа skune зоос: ${bal}\`\`\``)
        message.channel.send({ embeds: [moneyEmbed] })

    }
}