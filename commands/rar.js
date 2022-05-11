const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'rar',
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
                .setDescription(`\`\`\`Танд rar командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад rar командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        await db.delete(`autorole-${message.guild.id}`)
        const autoEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Auto assign role унтарлаа.\`\`\``)
        message.channel.send({ embeds: [autoEmbed] })
    }
}