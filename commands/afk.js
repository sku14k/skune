const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'afk',
    async execute(client, message, args) {
        const reason = args.join(' ') || 'Шалтгаангүй'
        await db.set(`afk-${message.author.id}+${message.guild.id}`, [Date.now(), reason])
        const embed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${message.author.tag} та afk боллоо.\n\nШалтгаан: ${reason}.\`\`\``)
        message.channel.send({ embeds: [embed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
}