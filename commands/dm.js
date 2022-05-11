const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'dm',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        let ownerID = '285098453808447490'
        if (message.author.id !== ownerID) {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд dm командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])?.user

        const str = args.slice(1).join(' ')

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}dm [Хэрэглэгчийн ID] [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const embed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${str}\`\`\``)
        user.send({ embeds: [embed] }).then(console.log('OK'))
    }
}