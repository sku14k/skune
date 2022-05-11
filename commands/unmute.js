const { Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'unmute',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      const clearError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд unmute командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад unmute командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let reason = args.slice(1).join(' ')
    var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

    if (!member) {
      const memberEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}unmute [@Хэрэглэгч] [Шалтгаан]\`\`\``)
      return message.channel.send({ embeds: [memberEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    if (!reason) reason = 'Шалтгаангүй'

    const role = message.guild.roles.cache.find((r) => r.name === 'skuneMuted')

    if (!member.roles.cache.has(role.id)) {
      const uuriinEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} хэрэглэгч серверээс muteлүүлээгүй байна.\`\`\``)
      return message.channel.send({ embeds: [uuriinEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    // const { guild } = message
    // const owner = await guild.fetchOwner()

    // if (member.id === message.author.id) {
    //   const cantEmbed = new MessageEmbed()
    //     .setColor('#679ad8')
    //     .setDescription(`\`\`\`Та өөрийгөө mute хийх боломжгүй.\`\`\``)
    //     .setFooter({ text: '© 2022 14K' })
    //   return message.channel.send({ embeds: [cantEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    // }

    // if (member.id === owner.id) {
    //   const ownerEmbed = new MessageEmbed()
    //     .setColor('#679ad8')
    //     .setDescription(`\`\`\`Сервер эзэмшигчийг unmute хийх боломжгүй.\`\`\``)
    //     .setFooter({ text: '© 2022 14K' })
    //   return message.channel.send({ embeds: [ownerEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    // }

    const mentionedPosition = member.roles.highest.position
    const memberPosition = message.member.roles.highest.position
    const botPosition = message.guild.me.roles.highest.position


    if (memberPosition <= mentionedPosition) {
      const banErr = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчийг unmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (botPosition <= mentionedPosition) {
      const banEr = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул unmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
    const reasonDm = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`Таны muteийг ${message.guild.name} серверээс гаргалаа.\`\`\``)
      .addFields(
        {
          name: 'Mute гаргасан',
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
    await member.send({ embeds: [reasonDm] })

    await member.roles.remove(role)

    const unmutedEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн muteг серверээс гаргалаа.\`\`\``)
    message.channel.send({ embeds: [unmutedEmbed] })
  }
}
