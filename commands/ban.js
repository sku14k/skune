const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'ban',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let reason = args.slice(1).join(' ')
    var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const banError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд ban командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад ban командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}ban [@Хэрэглэгч] [Шалтгаан]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }
    if (!mentionedMember) {
      const userEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Хэрэглэгч серверт байхгүй эсвэл та дурдсангүй.\`\`\``)
      return message.channel.send({ embeds: [userEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (mentionedMember.id === message.author.id) {
      const cantEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Та өөрийгөө ban хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [cantEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!reason) reason = 'Шалтгаангүй'

    const mentionedPosition = mentionedMember.roles.highest.position
    const memberPosition = message.member.roles.highest.position
    const botPosition = message.guild.me.roles.highest.position

    if (mentionedMember.id === message.client.user.id) {
      const aEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Намайг ban хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [aEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else {
      if (memberPosition <= mentionedPosition) {
        const banErr = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчийг ban хийх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      } else if (botPosition <= mentionedPosition) {
        const banEr = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул ban хийх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      }
    }

    try {
      const { guild } = message
      const owner = await guild.fetchOwner()

      if (mentionedMember.id === owner.id) {
        const ownerEmbed = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Сервер эзэмшигчийг ban хийх боломжгүй.\`\`\``)
        return message.channel.send({ embeds: [ownerEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
      } else {

        const reasonDm = new MessageEmbed()
          .setColor('#679ad8')
          .setDescription(`\`\`\`Та ${message.guild.name} серверээс banдууллаа.\`\`\``)
          .addFields(
            {
              name: 'Ban хийсэн',
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
        await mentionedMember.send({ embeds: [reasonDm] })
        await mentionedMember.ban({ reason: reason }).then(() => {
          const banSuccess = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${mentionedMember.user.tag} хэрэглэгчийг banдлаа.\`\`\``)
          message.channel.send({ embeds: [banSuccess] })
        })
      }
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Хэрэглчийг banдах явцад алдаа гарлаа.\`\`\``)
      message.channel.send({ embed: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
  }
}
