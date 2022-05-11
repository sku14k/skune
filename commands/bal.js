const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'bal',
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.member

        let bal = db.fetch(`money_${user.id}`)

        if (bal === null) bal = 'байхгүй'

        let bank = await db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 'байхгүй'

        let moneyEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${user.user.tag} хэрэглэгчийн үлдэгдэл\nХалаасанд: skune зоос ${bal}\nБанканд: skune зоос ${bank}.\`\`\``)
        message.channel.send({ embeds: [moneyEmbed] })
    }
}