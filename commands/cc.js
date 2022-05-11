const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'cc',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            const clearError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд cc командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад cc командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const channelNameQuery = args.join(' ')

        if (!channelNameQuery) {
            const channelName = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}cc [Үүсгэх Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [channelName] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        message.guild.channels.create(channelNameQuery).then((ch) => {
            const channelEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${ch.name} текст суваг үүсгэлээ.\`\`\``)
            message.channel.send({ embeds: [channelEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        })
    }
}