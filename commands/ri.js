const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'ri',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        let role

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}ri [Role ID]\n${prefix}ri [Role]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        if (args[0] && isNaN(args[0]) && !message.mentions.roles.first()) {
            role = message.guild.roles.cache.find(r => r.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim())

            if (!message.guild.roles.cache.find(r => r.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim())) {
                const noRoles = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Role олдсонгүй.\`\`\``)
                return message.channel.send({ embeds: [noRoles] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
        }

        if (args[0] && !isNaN(args[0])) {
            role = message.guild.roles.cache.find(r => r.id == args[0])
            if (!message.guild.roles.cache.has(args[0])) {
                const rolesNo = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Role ID олдсонгүй.\`\`\``)
                return message.channel.send({ embeds: [rolesNo] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
        }

        if (!role) {
            const embedHelp = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}ri [Role ID]\n${prefix}ri [Role]\`\`\``)
            return message.channel.send({ embeds: [embedHelp] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        let WithRole

        if (role.members.size > 5) WithRole = role.members.map(r => `${r.user.tag}`).slice(0, 5).join(', ') + ` мөн ${role.members.size - 5} өөр хэрэглэгчид`
        if (role.members.size < 5) WithRole = role.members.map(r => `${r.user.tag}`).join(', ')

        let embed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Role: ${role.name}, ID: ${role.id}\nRoleг mention хийж болох эсэх: ${role.mentionable.toString().replace('true', 'Болно').replace('false', 'Болохгүй')}\nRoleтой хэрэглэгчдийн тоо: ${role.members.size || `Байхгүй`}\nRoleтой хэрэглэгчид: ${WithRole ? WithRole : `Байхгүй`}\`\`\``)
        message.channel.send({ embeds: [embed] })
    }
}