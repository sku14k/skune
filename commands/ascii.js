const figlet = require('figlet')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'ascii',
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
                .setDescription(`\`\`\`Танд ascii командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад ascii командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}ascii [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        msg = args.join(' ')

        figlet.text(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong')
                console.dir(err)
            }

            if (data.length > 2000) {
                const textEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Мессежийн тоо хэмжээ 2000с дээш байх боломжгүй.\`\`\``)
                return message.channel.send({ embeds: [textEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            message.channel.send('```' + data + '```')
        })
    }
}