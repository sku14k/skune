const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clear',
    voiceChannel: true,
    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул дуу тоглуулах жагсаалтаас хасах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!queue.tracks[0]) {
            const noEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Тоглуулах жагсаалтанд дуу алга байна.\`\`\``)
            return message.channel.send({ embeds: [noEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const tracks = queue.tracks.map((track, i) => `${i + 1}`)

        await queue.clear(tracks)

        const clearEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Тоглуулах жагсаалтаас дууг хаслаа.\`\`\``)
        message.channel.send({ embeds: [clearEmbed] })
    }
}