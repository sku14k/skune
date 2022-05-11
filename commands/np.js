const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'np',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул давтах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const track = queue.current

        const embed = new MessageEmbed()

        embed.setColor('#679ad8');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['Унтраалттай', 'Асаалттай', 'Асаалттай'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`\`\`\`Дууны түвшин: ${queue.volume}%\nДууны урт: ${trackDuration}\nДавталт: ${methods[queue.repeatMode]}\n\`\`\``)
        
        message.channel.send({ embeds: [embed] })
    },
};