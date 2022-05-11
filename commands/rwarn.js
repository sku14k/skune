const { MessageEmbed, Message } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'rwarn',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            const clearError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд rwarn командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад rwarn командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const user = message.mentions.members.first()

        if (!user) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}rwarn [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        let reason = args.slice(1).join(' ')

        if (!reason) reason = 'Шалтгаангүй'

        if (message.mentions.members.first() === message.client.user.id) {
            const botEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Өөртөө анхааруулга өгөөгүй тул анхааруулга арилгах боломжгүй\`\`\``)
            return message.channel.send({ embeds: [botEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (message.author.id === user.id) {
            const userEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Өөрийнхөө анхааруулгыг арилгах боломжгүй\`\`\``)
            return message.channel.send({ embeds: [userEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if (warnings === null) {
            const nullEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${message.mentions.users.first} хэрэглэгч анхааруулгагүй байна.\`\`\``)
            return message.channel.send({ embeds: [nullEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

        db.delete(`warnings_${message.guild.id}_${user.id}`)

        const userEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Таны анхааруулгыг ${message.guild.name} серверээс арилгалаа.\`\`\``)
            .addFields(
                {
                    name: 'Анхааруулгыг арилгасан',
                    value: `\`\`\`${message.author.tag}\`\`\``
                },
                {
                    name: 'Шалтгаан',
                    value: `\`\`\`${reason}\`\`\``
                },
                {
                    name: 'Хэзээ',
                    value: `\`\`\`${date}\`\`\``
                }
            )

        const warnEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${user.user.tag} хэрэглэгчийн анхааруулгыг арилгалаа.\`\`\``)

        user.send({ embeds: [userEmbed] })
        await message.channel.send({ embeds: [warnEmbed] })
    }
}