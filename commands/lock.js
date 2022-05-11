const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lock',
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
                .setDescription(`\`\`\`Танд lock командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад lock командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const everyone = message.guild.roles.cache.find(role => role.name === '@everyone')

        const channel = message.mentions.channels.first()

        if (channel) {
            if (!everyone.permissionsIn(channel).has('SEND_MESSAGES')) {
                const unlockedEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${channel.name} текст суваг цоожлогдсон байна.\`\`\``)
                return message.channel.send({ embeds: [unlockedEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            channel.permissionOverwrites.edit(everyone, { SEND_MESSAGES: false })

            const channelEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${channel.name} текст сувгийг цоожиллоо.\`\`\``)
            return message.channel.send({ embeds: [channelEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })

        } else {
            if (!everyone.permissionsIn(message.channel).has('SEND_MESSAGES')) {
                const unlocketEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${message.channel.name} текст суваг цоожлогдсон байна.\`\`\``)
                return message.channel.send({ embeds: [unlocketEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            message.channel.permissionOverwrites.edit(everyone, { SEND_MESSAGES: false })

            const lockEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${message.channel.name} текст сувгийг цоожиллоо.\`\`\``)
            return message.channel.send({ embeds: [lockEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

    }
}