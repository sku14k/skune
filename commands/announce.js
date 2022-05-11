const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'announce',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            const clearError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд announce командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад announce командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        let mention

        if (!args.length) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}announce [#Текст Суваг] [Мессеж] [-ping]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const channel = message.mentions.channels.first()

        if (!channel) {
            const channelEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Зарлал бичүүлэх текст суваг дурдаагүй байна эсвэл олдсонгүй.\`\`\``)
            return message.channel.send({ embeds: [channelEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[1]) {
            const messageEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Зарлал бичүүлэх мессежээ оруулсангүй\`\`\``)
            return message.channel.send({ embeds: [messageEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++) {
                if (args[i].toLowerCase() === '-ping') args.splice(i, 1)
            }

            mention = true
        } else mention = false

        if (mention === true) channel.send('@everyone')

        const announcement = args.slice(1).join(' ')

        const announceEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${announcement}\`\`\``)
        channel.send({ embeds: [announceEmbed] })
    }
}