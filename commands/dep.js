const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    name: 'dep',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        let user = message.author
        let member = db.fetch(`money_${user.id}`)
        let member2 = db.fetch(`bank_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)
            let bank = await db.fetch(`bank_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд банкруу шилжүүлэх хангалттай skune зоос байхгүй байна.\`\`\``)

            if (money === 0) return message.channel.send({ embeds: [embedbank] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })

            db.add(`bank_${user.id}`, money)
            db.subtract(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та бүх skune зоосоо банкруу шилжүүллээ.\`\`\``)
            message.channel.send({ embeds: [embed5] })

        } else {
            let embed2 = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}dep [Skune Зоосны Хэмжээ]\`\`\``)

            if (!args[0]) {
                return message.channel.send({ embeds: [embed2] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
                    .catch(err => console.log(err))
            }
            let embed3 = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Банкруу шилжүүлэх skune зоосын утга натурал тоо байх ёстой.\`\`\``)

            if (message.content.includes('-')) {
                return message.channel.send({ embeds: [embed3] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            let embed4 = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд хангалттай skune зоос байхгүй байна.\`\`\``)

            if (member < args[0]) {
                return message.channel.send({ embeds: [embed4] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }

            let embed5 = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та ${args[0]} skune зоос банкруу шилжүүллээ.\`\`\``)

            message.channel.send({ embeds: [embed5] })
            db.add(`bank_${user.id}`, args[0])
            db.subtract(`money_${user.id}`, args[0])
        }
    }
}