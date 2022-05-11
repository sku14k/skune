const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const db = require('quick.db')

module.exports = {
    name: 'search',
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
                .setDescription(`\`\`\`${prefix}search [Дуу]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            const searchEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Хайсан дуу олдсонгүй.\`\`\``)
            return message.channel.send({ embeds: [searchEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('#679ad8');

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`\`\`\`Хайсан дуу: ${args.join(' ')}\n\n${maxTracks.map((track, i) => `${i + 1}. ${track.title} | ${track.author}`).join('\n')}\n\n1 - ${maxTracks.length} хүртэлх дуунуудаас сонгоно дугаарын бичээд дуугаа захиалаарай.\`\`\``)

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 60000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') {
                collector.stop();
                const cancelEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Цуцлагдлаа.\`\`\``)
                return message.channel.send({ embeds: [cancelEmbed] })
            }

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) {
                const numberEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та 1 - ${maxTracks.length} хүртэлх дуунуудаас сонгоно уу.\`\`\``)
                return message.channel.send({ embeds: [numberEmbed] })
            }

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id)
                const joinEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та дуут сувагт орсны дараагаар дуугаа сонгонуу.\`\`\``)
                return message.channel.send({ embeds: [joinEmbed] })
            }

            const callEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Таны дууны захиалгыг тавьж байна.\`\`\``)
            await message.channel.send({ embeds: [callEmbed] })

            queue.addTrack(res.tracks[Number(query.content) - 1]);
            if (!queue.playing) await queue.play();

        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') {
                const timeEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Дуу хайх цаг дууслаа.\`\`\``)
                return message.channel.send({ embeds: [timeEmbed] });
            }
        });
    },
};