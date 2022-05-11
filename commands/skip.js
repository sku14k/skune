const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'skip',
    voiceChannel: true,
    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул алгасах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const success = queue.skip()

        if (success) {
            const skipEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${queue.current.title} дууг алгаслаа.\`\`\``)
            return message.channel.send({ embeds: [skipEmbed] })
        } else {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дууг алгасах явцад алдаа гарлаа.\`\`\``)
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}