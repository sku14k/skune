const { MessageEmbed } = module.require("discord.js");
const db = require("quick.db");
const fetch = require('node-fetch')

module.exports = {
    name: "lyrics",
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
                .setDescription(`\`\`\`${prefix}lyrics [Дууны Нэр]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        let lyrics = args.slice(0).join(' ')

        let res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(lyrics)}`).then((res) => {
            res.json().then((resulut) => {
                const lyricsEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setTitle(resulut.title)
                    .setAuthor(resulut.author)
                    .setURL(resulut.links.genius)
                    .setThumbnail(resulut.thumbnail.genius)
                    .setDescription(`>>> ${String(resulut.lyrics).substr(0, 4000)}`)
                message.channel.send({ embeds: [lyricsEmbed] })
            })
        })


    }
}