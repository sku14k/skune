const { Client, Message, MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')
const db = require('quick.db')

module.exports = {
    name: 'translate',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}translate [Орчуулах Үг]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const query = args.join(' ');

        if (!query) {
            const wordEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Орчуулах үгээ оруулаагүй байна.\`\`\``)
            return message.channel.send({ embeds: [wordEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const translated = await translate(query, { to: 'mn' })

        const translatedEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${translated.text}\`\`\``)
        message.channel.send({ embeds: [translatedEmbed] })
    },
};