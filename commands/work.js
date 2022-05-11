const Discord = require('discord.js');
const ms = require("parse-ms");
const db = require("quick.db")

module.exports = {
    name: "work",

    async execute(client, message, args) {
        let user = message.author;

        let author = await db.fetch(`work_${user.id}`)

        let timeout = 43200000

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("#679ad8")
                .setDescription(`\`\`\`Та ажилласан байна.${time.hours} цаг ${time.minutes} минут ${time.seconds} секундын дараагаар ажиллах боломжтой.\`\`\``);
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {

            let replies = ['Програмистаар', 'Барилгачинаар', 'Зөөгчөөр', 'Тогоочоор', 'Механикчаар']

            let result = Math.floor((Math.random() * replies.length));
            let amounta = Math.floor(Math.random() * 3) + 1;
            let multiplier = await db.fetch(`multiplier_${message.guild.id}`);
            if (!multiplier) multiplier = 1;
            let amount = amounta * multiplier;

            let embed1 = new Discord.MessageEmbed()
                .setColor("#679ad8")
                .setDescription(`\`\`\`Та ${replies[result]} ажиллаж ${amount} skune зоос цуглууллаа.\`\`\``);
            message.channel.send({ embeds: [embed1] })

            await db.add(`money_${user.id}`, amount)
            await db.set(`work_${user.id}`, Date.now())
        };
    }
}