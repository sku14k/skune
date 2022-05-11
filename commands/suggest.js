const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'suggest',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        const owner = message.client.users.cache.find(user => user.id === '285098453808447490')
        const suggest = args.slice(0).join(' ')

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}suggest [Санал хүсэлт]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        const embed = new MessageEmbed()
            .setColor('#679ad8')
            .addFields(
                {
                    name: `${message.author.tag}н санал`,
                    value: `\`\`\`${suggest}\`\`\``,
                }
            )
        const suggestEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${message.author.tag} таны санал хүсэлтийг хүлээн авлаа.\`\`\``)
        owner.send({ embeds: [embed] })
        message.channel.send({ embeds: [suggestEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
};
