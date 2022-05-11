const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'bans',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            const banError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд bans командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад bans командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const fetchBans = message.guild.bans.fetch().then(bans => {

            let list = bans.map(user => `${user.user.tag} - ${user.user.id}`).join(`\n`)

            if (list.length >= 1950) list = `${list.slice(0, 1948)}`


            if (bans.size <= 0) {
                const noBan = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Серверээс banдуулсан хэрэглэгч алга.\`\`\``)
                message.channel.send({ embeds: [noBan] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
            } else {
                const bansEmbed = new MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`${bans.size} хэрэглэгч серверээс banдуулсан байна.\n\n${list}\`\`\``)
                message.channel.send({ embeds: [bansEmbed] })
            }
        })
            .catch(console.error);
    }
}