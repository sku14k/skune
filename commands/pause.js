const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'pause',
    voiceChannel: true,
    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул түр зогсоох боломжгүй\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const success = queue.setPaused(true)

        const pauseEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${queue.current.title} дууг түр зогслоо\`\`\``)

        const errorEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Дууг түр зогсоосон эсвэл зогсоох явцад алдаа гарлаа.\`\`\``)

        if (success) {
            return message.channel.send({ embeds: [pauseEmbed] })
        } else {
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}