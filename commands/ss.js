const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'ss',
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
                .setDescription(`\`\`\`Танд ss командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад ss командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}ss [Хугацаа 30s = 30 секунд]\n${prefix}ss [#Текст Суваг] [Хугацаа 30s = 30 секунд]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const channel = message.mentions.channels.first()

        if (channel) {
            if (channel.rateLimitPerUser > 0) {
                const erorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${channel.name} текст сувгийн slowmode асаалттай байна.\`\`\``)
                return message.channel.send({ embeds: [erorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            const raw = args.slice(1).join(' ')
            const milliseconds = ms(raw)

            if (isNaN(milliseconds)) {
                const numberEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хугацаа натурал тоо байх ёстой.\`\`\``)
                return message.channel.send({ embeds: [numberEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            if (milliseconds < 1000) {
                const secondEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хугацаа 1 секундаас доош байж болохгүй.\`\`\``)
                return message.channel.send({ embeds: [secondEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            channel.setRateLimitPerUser(milliseconds / 1000)

            const slowmodeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${channel.name} текст сувгийн slowmode ${ms(milliseconds, { long: true })} боллоо.\`\`\``)
            message.channel.send({ embeds: [slowmodeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            if (message.channel.rateLimitPerUser > 0) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`#${message.channel.name} текст сувгийн slowmode асаалттай байна.\`\`\``)
                return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            const rew = args[0]
            const milli = ms(rew)

            if (isNaN(milli)) {
                const numbaEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хугацаа натурал тоо байх ёстой.\`\`\``)
                return message.channel.send({ embeds: [numbaEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            if (milli < 1000) {
                const secondsEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хугацаа 1 секундаас доош байж болохгүй.\`\`\``)
                return message.channel.send({ embeds: [secondsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            message.channel.setRateLimitPerUser(milli / 1000)

            const slowMode = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`#${message.channel.name} текст сувгийн slowmode ${ms(milli, { long: true })} боллоо.\`\`\``)
            message.channel.send({ embeds: [slowMode] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
    }
}