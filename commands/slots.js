const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":seven:", ":strawberry: ", ":cherries:"];
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms')

module.exports = {
    name: 'slots',
    async execute(client, message, args) {
        let user = message.author;
        let timeout = 15000
        let cooldown = await db.fetch(`cooldown_${user.id}`)
        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та ${time.seconds} секундын дараагаар slots командыг ашиглах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            let prefix = await db.fetch(`prefix_${message.guild.id}`)

            if (prefix == null) {
                prefix = 'skune'
            } else {
                prefix = prefix
            }
            let moneydb = await db.fetch(`money_${user.id}`)
            let money = parseInt(args[0]);
            let win = false;

            let moneymore = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та өөрт байгаа skune зоосноос ихийг тавиад байна.\`\`\``)

            let moneyhelp = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}slots [Skune Зоосны Хэмжээ]\`\`\``)

            if (!money) return message.channel.send({ embeds: [moneyhelp] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
            if (money > moneydb) return message.channel.send({ embeds: [moneymore] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })

            let number = []
            for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

            if (number[0] == number[1] && number[1] == number[2]) {
                money *= 7
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                money *= 2
                win = true;
            }
            if (win) {
                let slotsEmbed1 = new MessageEmbed()
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nТа ${money} skune зоос хожлоо!`)
                    .setColor('#679ad8')
                message.channel.send({ embeds: [slotsEmbed1] })
                db.add(`money_${user.id}`, money)
            } else {
                let slotsEmbed = new MessageEmbed()
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nТа ${money} skune зоос алдаа!`)
                    .setColor('#679ad8')
                message.channel.send({ embeds: [slotsEmbed] })
                db.subtract(`money_${user.id}`, money)
            }
            db.set(`cooldown_${user.id}`, Date.now())
        }
    }
}