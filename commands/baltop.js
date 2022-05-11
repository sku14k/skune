const { MessageEmbed } = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'baltop',
    async execute(client, message, args) {
        let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
        money.length = 10;
        var finalLb = "";
        for (var i in money) {
          finalLb += `${money.indexOf(money[i])+1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"} - ${money[i].data} skune зоос\n`;
        }

        const embed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Skune зоосоор тэргүүлэгчдийн самбар:\n${finalLb}\`\`\``)
        message.channel.send({ embeds: [embed] })
    }
}