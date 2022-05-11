const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'aar',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            const banError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд aar командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад aar командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
        const role = message.guild.roles.cache.find((r) => r.name === args.slice(0).join(' '))
        if (!role) {
            const roleEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}aar [Role]\`\`\``)
            return message.channel.send({ embeds: [roleEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        await db.set(`autorole-${message.guild.id}`, role.id);
        const autoEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Auto assign role ${role.name} боллоо.\`\`\``)
        message.channel.send({ embeds: [autoEmbed] })
    }
}