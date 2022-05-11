const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'loop',
    voiceChannel: true,
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        const queue = client.player.getQueue(message.guild.id)

        if (!queue || !queue.playing) {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Дуу тоглоогүй тул давтах боломжгүй.\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) {
                const loopEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та дууны давталтыг унтраасанаар жагсаалтыг давтуулах боломжтой. ${prefix}loop\`\`\``)
                return message.channel.send({ embeds: [loopEmbed] })
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            if (success) {
                if (queue.repeatMode === 0) {
                    const loopStop = new MessageEmbed()
                        .setColor('#679ad8')
                        .setDescription(`\`\`\`Давталт: Унтраалттай\`\`\``)
                    return message.channel.send({ embeds: [loopStop] })
                } else {
                    const loopOn = new MessageEmbed()
                        .setColor('#679ad8')
                        .setDescription(`\`\`\`Давталт: Асаалттай\`\`\``)
                    return message.channel.send({ embeds: [loopOn] })
                }
            } else {
                const errorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Давталтыг тохируулахад алдаа гарлаа.\`\`\``)
                return message.channel.send({ embeds: [errorEmbed] })
            }
        } else {
            if (queue.repeatMode === 2) {
                const repeatQueue = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Та жагсаалтын давталыг унтрааснаар дууг давтуулах боломжтой. ${prefix}loop queue\`\`\``)
                return message.channel.send({ embeds: [repeatQueue] })
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF)

            if (success) {
                if (queue.repeatMode === 0) {
                    const luupEmbed = new MessageEmbed()
                        .setColor('#679ad8')
                        .setDescription(`\`\`\`Давталт: Утраалттай\`\`\``)
                    return message.channel.send({ embeds: [luupEmbed] })
                } else {
                    const luupOn = new MessageEmbed()
                        .setColor('#679ad8')
                        .setDescription(`\`\`\`Давталт: Асаалттай\`\`\``)
                    return message.channel.send({ embeds: [luupOn] })
                }
            } else {
                const erorEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Давталтыг тохируулахад алдаа гарлаа.\`\`\``)
                return message.channel.send({ embeds: [erorEmbed] })
            }
        }
    }
}