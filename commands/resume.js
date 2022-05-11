const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'resume',
    voiceChannel: true,
    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул үргэлжлүүлэх боломжгүй\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const success = queue.setPaused(false)

        const resumeEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${queue.current.title} дууг үргэлжлүүллээ.\`\`\``)

        const errorEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Дууг үргэлжлүүлсэн эсвэл үргэлжлүүлэх явцад алдаа гарлаа\`\`\``)

        if (success) {
            return message.channel.send({ embeds: [resumeEmbed] })
        } else {
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}