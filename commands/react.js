const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'react',
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
                .setDescription(`\`\`\`Танд react командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад react командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}react [Мессеж ID] [Эможи]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const msg = await message.channel.messages.fetch(args[0])
        const join = args.slice(1).join(' ')
        msg.react(join).then(message.delete())
    }
}
