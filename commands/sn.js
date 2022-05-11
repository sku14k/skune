const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'sn',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
      const banError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд sn командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад sn командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    const { guild } = message
    const owner = await guild.fetchOwner()

    if (message.mentions.members.first() === owner.id) {
      const errorEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Сервер эзэмшигчийн nicknameийг өөрчлөх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}sn [Nickname]\n${prefix}sn [@Хэрэглэгч] [Nickname]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    if (message.mentions.members.first()) {
      member = message.mentions.members.first()
      arguments = args.splice(1).join(' ')

      const mentionedPosition = member.roles.highest.position
      const memberPosition = message.member.roles.highest.position
      const botPosition = message.guild.me.roles.highest.position

      if (memberPosition <= mentionedPosition) {
        const banErr = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчийн nicknameийн өөрчлөх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      } else if (botPosition <= mentionedPosition) {
        const banEr = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул nicknameийн өөрчлөх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      }

      if (!arguments) {
        const argumentEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн nicknameийг арилгалаа.\`\`\``)
        return message.channel.send({ embeds: [argumentEmbed] }).then(member.setNickname(null))
      }
      member.setNickname(arguments)

      const nickEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн nickname ${arguments} болж өөрчлөгдлөө.\`\`\``)
      return message.channel.send({ embeds: [nickEmbed] })
    } else {
      let member = message.member
      let arguments = args[0]

      if (message.author.id === owner.id) {
        const ownerEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Сервер эзэмшигчийн nicknameийг өөрчлөх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [ownerEmbed] })
      }

      if (!arguments) {
        const argumentsEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн nicknameийг арилгалаа.\`\`\``)
        return message.channel.send({ embeds: [argumentsEmbed] }).then(member.setNickname(null))
      }
      member.setNickname(arguments)

      const selfEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} таны nickname ${arguments} болж өөрчлөгдлөө.\`\`\``)
      return message.channel.send({ embeds: [selfEmbed] })
    }
  }
}
