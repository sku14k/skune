const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'play',
    voiceChannel: true,
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
                .setDescription(`\`\`\`${prefix}play [Дуу]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        })

        if (!res || !res.tracks.length) {
            const noFound = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Таны хайсан дуу олдсонгүй\`\`\``)
            return message.channel.send({ embeds: [noFound] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        })

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id)
            // return message.channel.send(`${message.author}, I can't join audio channel. ❌`);
        }

        // await message.channel.send(`Your ${res.playlist ? 'Your Playlist' : 'Your Track'} Loading... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};