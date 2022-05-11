const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'reactionr',
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
                .setDescription(`\`\`\`Танд reactionr командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад reactionr командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const msg = await message.channel.messages.fetch(args[0])
        const role = message.guild.roles.cache.find((r) => r.name === args.slice(1).join(' '))
        const join = args.slice(2).join(' ')

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679da8')
                .setDescription(`\`\`\`${prefix}reactionr [Мессеж ID] [Role] [Эможи]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        if(msg) const msgid = db.fetch(`msgid_${msg}`)
        if(role) const roledb = db.fetch(`roledb_${roledb}`)
        if(join) const joindb = db.fetch(`joindb_${join}`)
        
        msg.react(join).then(message.delete())
    }
}