const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'rs',
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
                .setDescription(`\`\`\`Танд rs командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад rs командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const channel = message.mentions.channels.first()

        if (channel) {
            if (channel.rateLimitPerUser === 0) {
                const erorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${channel.name} текст сувгийн slowmode унтарсан байна.\`\`\``)
                return message.channel.send({ embeds: [erorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            channel.setRateLimitPerUser(0)
            const slowmodeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${channel.name} текст сувгийн slowmode унтарлаа.\`\`\``)
            return message.channel.send({ embeds: [slowmodeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            if (message.channel.rateLimitPerUser === 0) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${message.channel.name} текст сувгийн slowmode унтарсан байна.\`\`\``)
                return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            message.channel.setRateLimitPerUser(0)
            const slowMode = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${message.channel.name} текст сувгийн slowmode унтарлаа.\`\`\``)
            return message.channel.send({ embeds: [slowMode] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
    }
}