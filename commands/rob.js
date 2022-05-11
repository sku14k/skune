const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
module.exports = {
    name: 'rob',
    async execute(client, message, args) {
        var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (message.mentions.members.first().id === message.author.id) {
            const selfRob = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Тэнэг юм уу эсвэл динэг юм уу? Өөрөөсөө хулгай хийхгээ юу мангараа?\`\`\``)
            return message.channel.send({ embeds: [selfRob] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
        //3600000
        let timeout = 3600000
        let cooldown = await db.fetch(`rob_${message.author.id}`)
        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та ${time.minutes} минут ${time.seconds} секундын дараагаар rob командыг ашиглах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!mention) {
                const helpEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`${prefix}rob [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
                return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
            }
            let moneyEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд 200 skune зоос халаасанд чинь байж хэрэглэгч дээрэмдэх боломжтой.\`\`\``)
            let author = await db.fetch(`money_${message.author.id}`)
            if (author < 200) {
                return message.channel.send({ embeds: [moneyEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            let money = db.get(`money_${mention.id}`)
            if (money < 1) {
                let moneyEmbed2 = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`${mention.user.tag} хэрэглэгч дээрэмдүүлэх skune зоосгүй байна.\`\`\``)
                return message.channel.send({ embeds: [moneyEmbed2] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
            if (money === null) money = 0
            let random = Math.floor(Math.random() * 50) + 1
            let lostCoins = Math.floor(Math.random() * 20) + 1
            function randomMoney() {
                const num = Math.floor(Math.random() * 2)
                return num === 1
            }
            if (randomMoney() === true) {
                let embed = new MessageEmbed()
                    .setDescription(`\`\`\`${message.author.tag} та ${mention.user.tag} хэрэглэгчээс ${random} skune зоос дээрэмдлээ.\`\`\``)
                    .setColor('#679ad8')
                message.channel.send({ embeds: [embed] })
                const reasonDm = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та ${message.guild.name} серверээс дээрэмдүүллээ.\`\`\``)
                    .addFields(
                        {
                            name: 'Дээрэмдсэн',
                            value: `\`\`\`Харин мэдэж чадсангүй\`\`\``
                        },
                        {
                            name: 'Хэдийг',
                            value: `\`\`\`${random} skune зоос\`\`\``
                        },
                        {
                            name: 'Хэзээ',
                            value: `\`\`\`${date}\`\`\``
                        }
                    )
                await mention.send({ embeds: [reasonDm] })
                db.subtract(`money_${mention.id}`, random)
                db.add(`money_${message.author.id}`, random)
                db.set(`rob_${message.author.id}`, Date.now())
            } else {
                db.subtract(`money_${message.author.id}`, lostCoins)
                db.set(`rob_${message.author.id}`, Date.now())
                const tryRob = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Таныг ${message.guild.name} серверээс дээрэмдэх гэж оролдлоо.\`\`\``)
                    .addFields(
                        {
                            name: 'Дээрэмдэх гэж оролдсон',
                            value: `\`\`\`Хэн мэдхэв\`\`\``
                        },
                        {
                            name: 'Хэзээ',
                            value: `\`\`\`${date}\`\`\``
                        }
                    )
                await mention.send({ embeds: [tryRob] })
                let lostEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`${message.author.tag} та ${mention.user.tag} хэрэглэгчийг дээрэмдэх гэж байгаад баригдлаа. Загдаа таниас ${lostCoins} зоос хураалаа!\`\`\``)
                return message.channel.send({ embeds: [lostEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            }
        }
    }
}