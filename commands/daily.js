const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    async execute(client, message, args) {
        let user = message.author;

        let timeout = 86400000
        let amount = 1

        let daily = await db.fetch(`daily_${user.id}`)

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та өнөөдрийн skune зоосоо цуглуулсан байна.${time.hours} цаг ${time.minutes} минут ${time.seconds} секундын дараагаар skune зоосоо цуглуулах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та ${amount} skune зоос цуглууллаа.\`\`\``)
            message.channel.send({ embeds: [moneyEmbed] })
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())
        }
    }
}