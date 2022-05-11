const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'rn',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            const banError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд rn командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад rn командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const { guild } = message
        const owner = await guild.fetchOwner()

        if (message.mentions.members.first() === owner.id) {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Сервер эзэмшигчийн nicknameийг арилгах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}rn\n${prefix}rn [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        if (message.mentions.members.first()) {
            member = message.mentions.members.first()

            const mentionedPosition = member.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position

            if (memberPosition <= mentionedPosition) {
                const banErr = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчийн nicknameийн арилгах боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            } else if (botPosition <= mentionedPosition) {
                const banEr = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул nicknameийн арилгах боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            member.setNickname(null)

            const nickEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн nicknameийг арилгалаа.\`\`\``)
            return message.channel.send({ embeds: [nickEmbed] })
        } else {
            let member = message.member

            if (message.author.id === owner.id) {
                const ownerEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Сервер эзэмшигчийн nicknameийг арилгах боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [ownerEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            member.setNickname(null)

            const selfEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${member.user.tag} таны nicknameийг арилгалаа.\`\`\``)
            return message.channel.send({ embeds: [selfEmbed] })
        }
    }
}
