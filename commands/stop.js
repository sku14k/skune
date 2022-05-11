const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'stop',
    voiceChannel: true,
    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул зогсоох боломжгүй\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        queue.destroy()

        const stopEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Дууг зогсоолоо.\`\`\``)
        message.channel.send({ embeds: [stopEmbed] })
    },
};