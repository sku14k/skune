const { MessageEmbed, Message } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'warns',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        const user = message.mentions.members.first() || message.member

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if (warnings === null) warnings = 'байхгүй'

        const warnEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${user.user.tag} хэрэглэгч танд анхааруулга ${warnings} байна.\`\`\``)
        message.channel.send({ embeds: [warnEmbed] })
    }
}