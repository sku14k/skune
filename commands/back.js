const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул өмнөх дууг тоглуулах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!queue.previousTracks[1]) {
            const prevEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Өмнө дуу тоглоогүй тул өмнөх дууг тоглуулах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [prevEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }
        await queue.back()

        const prevMusic = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Өмнөх дууг тоглуулж байна.\`\`\``)
        message.channel.send({ embeds: [prevMusic] })
    },
};