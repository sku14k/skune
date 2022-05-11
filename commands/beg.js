const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db")

module.exports = {
    name: "beg",
    async execute(client, message, args) {
        let user = message.author;
        let timeout = 43200000

        let beg = await db.fetch(`beg_${user.id}`);

        let multiplier = await db.fetch(`multiplier_${message.guild.id}`);
        if (!multiplier) multiplier = 1;

        let amounta = Math.floor(Math.random() * 2) + 1;
        let amounts = amounta * multiplier;

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg))
            let timeEmbed = new Discord.MessageEmbed()
                .setColor("#679ad8")
                .setDescription(`\`\`\`Та skune зоос гуйсан байна.${time.hours} цаг ${time.minutes} минут ${time.seconds} секундын дараа дахин гуйна уу.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            let begEmbed = new Discord.MessageEmbed()
                .setColor("#679ad8")
                .setDescription(`\`\`\`Та Skune хотын гудамд skune зоос гуйснаар ${amounts} skune зоостой боллоо!\`\`\``)
            message.channel.send({ embeds: [begEmbed] })
            db.add(`money_${user.id}`, amounts);
            db.set(`beg_${user.id}`, Date.now());
        }
    }
}