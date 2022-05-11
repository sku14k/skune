const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const rgx = /^(?:<@!?)?(\d+)>?$/

module.exports = {
  name: 'unban',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const banError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд unban командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад unban командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}unban [Хэрэглэгчийн ID] [Шалтгаан]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    let reason = args.slice(1).join(' ')

    if (!reason) reason = 'Шалтгаангүй'

    try {
      const id = args[0]
      if (!rgx.test(id)) {
        const errorEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Үнэн зөв хэрэглэгчийн IDг оруулна уу.\`\`\``)
        return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      }

      const bannedUsers = await message.guild.bans.fetch()

      if (!bannedUsers.get(id)) {
        const errEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Хэрэглэгч серверээс banдуулаагүй байна.\`\`\``)
        return message.channel.send({ embeds: [errEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      }

      const user = bannedUsers.get(id).user

      await message.guild.members.unban(user, reason)

      const sendDm = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Таны banг ${message.guild.name} серверээс гаргалаа.\`\`\``)
        .addFields(
          {
            name: 'Ban гаргасан',
            value: `\`\`\`${message.author.tag}\`\`\``
          },
          {
            name: 'Шалтгаан',
            value: `\`\`\`${reason}\`\`\``
          },
          {
            name: 'Хэзээ',
            value: `\`\`\`${date}\`\`\``
          }
        )
        .setFooter({ text: '© 2022 14K' })

      const embed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${user.tag} хэрэглэгчийн banг серверээс гаргалаа.\`\`\``)
      message.channel.send({ embeds: [embed] })
      user.send({ embeds: [sendDm] }).catch(e => console.log('Хэрэлэгчрүү DM явуулах боломжгүй байна.'))
    } catch (e) {
      console.log(e)
    }
  }
}

