const maxVol = require('../config.js').opt.maxVol
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'volume',
    voiceChannel: true,
    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул дууны түвшинг өөрчлөх боломжгүй\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const vol = parseInt(args[0])

        if (!vol) {
            const volEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Одоогийн дууны түвшин: ${queue.volume}. 1 - ${maxVol} хүртэлх дууны түвшинг өөрчлөх боломжтой\`\`\``)
            return message.channel.send({ embeds: [volEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        if (queue.volume === vol) {
            const embedVol = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дууны түвшин ${queue.volume} дээр байна.\`\`\``)
            return message.channel.send({ embeds: [embedVol] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (vol < 0 || vol > maxVol) {
            const warnEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Та зөвхөн 1 - ${maxVol} хооронд дууны түвшинг өөрчлөх боломжтой.\`\`\``)
            return message.channel.send({ embeds: [warnEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const success = queue.setVolume(vol)

        if (success) {
            const changeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дууны түвшин ${vol}/${maxVol} болж өөрчлөгдлөө.\`\`\``)
            return message.channel.send({ embeds: [changeEmbed] })
        } else {
            const errorEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дууны түвшинг өөрчлөх явцад алдаа гарлаа\`\`\``)
        }
    }
}