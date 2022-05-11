const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    voiceChannel: true,
    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул тоглуулалтын жагсаалтыг харах боломжгүй\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!queue.tracks[0]) {
            const noQueue = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Тоглуулалтын жагсаалтанд дуу алга байна\`\`\``)
            return message.channel.send({ embeds: [noQueue] })
        }

        const embed = new MessageEmbed()
        embed.setColor('#679ad8');
        const tracks = queue.tracks.map((track, i) => `${i + 1}. ${track.title} | ${track.author}`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Бас бусад ${songs - 5} дуунууд` : `${songs} дуу тоглуулалтын жагсаалтанд байна`

        embed.setDescription(`\`\`\`Одоо тоглож буй дуу: ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}\`\`\``)
        message.channel.send({ embeds: [embed] });
    },
};