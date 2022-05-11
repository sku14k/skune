const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'edit',
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
                .setDescription(`\`\`\`Танд edit командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад edit командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}edit [Bot Мессеж ID] [Мессеж]\n${prefix}edit [Bot Мессеж ID] embed [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        const msg = await message.channel.messages.fetch(args[0]);

        if (args[1].toLowerCase() === "embed") {
            const join = args.slice(2).join(' ')
            const embed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(join);

            msg.edit({ embeds: [embed] }).then(message.delete())
        } else {
            const join2 = args.slice(1).join(' ');
            msg.edit(join2).then(message.delete());
        }
    }
}