const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    name: 'roulette',
    async execute(client, message, args) {
        let user = message.author
        let timeout = 15000
        let cooldown = await db.fetch(`cooldown_${user.id}`)
        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та ${time.seconds} секундын дараагаар roulette командыг ашиглах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            let prefix = await db.fetch(`prefix_${message.guild.id}`)

            if (prefix == null) {
                prefix = 'skune'
            } else {
                prefix = prefix
            }

            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }
            let colour = args[0];
            let money = parseInt(args[1]);
            let moneydb = await db.fetch(`money_${user.id}`)

            let random = Math.floor(Math.random() * 37);

            let moneyhelp = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}roulette [Өнгө red, black, green] [Skune Зоосны Хэмжээ]\`\`\``);

            let moneymore = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд хангалттай skune зоос байхгүй байна.\`\`\``)

            let colorbad = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}roulette [Өнгө red, black, green] [Skune Зоосны Хэмжээ]\`\`\``)


            if (!colour) return message.channel.send({ embeds: [colorbad] });
            colour = colour.toLowerCase()
            if (!money) return message.channel.send({ embeds: [moneyhelp] });
            if (money > moneydb) return message.channel.send({ embeds: [moneymore] });

            if (colour == "b" || colour.includes("black")) colour = 0;
            else if (colour == "r" || colour.includes("red")) colour = 1;
            else if (colour == "g" || colour.includes("green")) colour = 2;
            else return message.channel.send({ embeds: [colorbad] });



            if (random == 0 && colour == 2) { // Green
                money *= 10
                db.add(`money_${user.id}`, money)
                let moneyEmbed1 = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`:green_circle: | Та ${money} skune зоос хожлоо!\n\nҮржсэн: 10x`);
                message.channel.send({ embeds: [moneyEmbed1] })
                console.log(`${message.author.tag} Won ${money} on green`)
            } else if (isOdd(random) && colour == 1) { // Red
                money = parseInt(money * 1.5)
                db.add(`money_${user.id}`, money)
                let moneyEmbed2 = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`:red_circle: | Та ${money} skune зоос хожлоо!\n\nҮржсэн: 1.5x`);
                message.channel.send({ embeds: [moneyEmbed2] })
            } else if (!isOdd(random) && colour == 0) { // Black
                money = parseInt(money * 2)
                db.add(`money_${user.id}`, money)
                let moneyEmbed3 = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`:black_circle: | Та ${money} skune зоос хожлоо!\n\nҮржсэн: 2x`);
                message.channel.send({ embeds: [moneyEmbed3] })
            } else { // Wrong
                db.subtract(`money_${user.id}`, money)
                let moneyEmbed4 = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`Та ${money} skune зоос алдлаа!\n\nҮржсэн: 0x`);
                message.channel.send({ embeds: [moneyEmbed4] })
            }
            db.set(`cooldown_${user.id}`, Date.now())
        }
    }
}