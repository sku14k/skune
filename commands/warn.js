const { MessageEmbed, Message } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'warn',
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
                .setDescription(`\`\`\`Танд warn командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад warn командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}warn [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        let reason = args.slice(1).join(' ')

        if (!reason) reason = 'Шалтгаангүй'

        if (user.id === message.author.id) {
            const cantEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та өөртөө анхааруулга өгөх боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [cantEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const mentionedPosition = user.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if (user.id === message.client.user.id) {
            const aEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад анхааруулга өгөх боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [aEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            if (memberPosition <= mentionedPosition) {
                const banErr = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчд анхааруулга өгөх боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            } else if (botPosition <= mentionedPosition) {
                const banEr = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул анхааруулга өгөх боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
        }

        const { guild } = message
        const owner = await guild.fetchOwner()

        if (user.id === owner.id) {
            const ownerEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Сервер эзэмшигчд анхааруулга өгөх боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [ownerEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const userEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Танд ${message.guild.name} серверээс анхааруулга ирлээ.\`\`\``)
            .addFields(
                {
                    name: 'Анхааруулсан',
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

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        const warnEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${user.user.tag} хэрэглэгчд анхааруулга өглөө.\`\`\``)

        if (warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send({ embeds: [userEmbed] })
            await message.channel.send({ embeds: [warnEmbed] })
        } else if (warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send({ embeds: [userEmbed] })
            await message.channel.send({ embeds: [warnEmbed] })
        }
    }
}