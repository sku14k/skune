const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'save',
    voiceChannel: true,
    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул давтах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const authorSend = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${queue.current.title} | ${queue.current.author}\`\`\``)
        message.author.send({ embeds: [authorSend] }).then(() => {
            const saveEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${message.author.tag} хэрэглэгч таны DMлүү дууны нэрийг явууллаа.\`\`\``)
            message.channel.send({ embeds: [saveEmbed] })
        }).catch(error => {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${message.author.tag} хэрэлэгч тань руу DM явуулах боломжгүй байна.\`\`\``)
            message.channel.send({ embeds: [errorEmbed] })
        });
    },
};