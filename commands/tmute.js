const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
  name: 'tmute',
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
        .setDescription(`\`\`\`Танд tmute командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад tmute командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
    const member = message.mentions.members.first()
    const time = args[1]
    let reason = args.slice(2).join(' ')
    const role = message.guild.roles.cache.find(role => role.name === 'skuneTempMuted')

    var date = `${message.createdAt.getFullYear()} оны ${message.createdAt.getMonth() + 1}р сарын ${message.createdAt.getDate()}нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`

    if (!member) {
      const memberEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}tmute [@Хэрэглэгч] [Хугацаа 30s = 30 секунд] [Шалтгаан]\`\`\``)
      return message.channel.send({ embeds: [memberEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    if (!reason) reason = 'Шалтгаангүй'

    if (member.id === message.author.id) {
      const cantEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Та өөрийгөө tmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [cantEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    const { guild } = message
    const owner = await guild.fetchOwner()

    if (member.id === owner.id) {
      const ownerEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Сервер эзэмшигчийг tmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [ownerEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (member.id === message.client.user.id) {
      const aEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Намайг tmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [aEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!time) {
      const timeEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Хугацааг оруулаагүй байна. 30s = 30 секунд\`\`\``)
      return message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    const mentionedPosition = member.roles.highest.position
    const memberPosition = message.member.roles.highest.position
    const botPosition = message.guild.me.roles.highest.position

    if (memberPosition <= mentionedPosition) {
      const banErr = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Та өөрөөсөө өндөр болон адилхан roleтэй хэрэглэгчийг tmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [banErr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (botPosition <= mentionedPosition) {
      const banEr = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Хэрэглэгчийн role өндөр тул tmute хийх боломжгүй.\`\`\``)
      return message.channel.send({ embeds: [banEr] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!role) {
      try {
        let muterole = await message.guild.roles.create({
          name: 'skuneTempMuted',
          permissions: [],
        })
        message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
          await channel.permissionOverwrites.create(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          })
        })

        message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').forEach(async (channel, id) => {
          await channel.permissionOverwrites.create(muterole, {
            SPEAK: false
          })
        })
      } catch (error) {
        console.log(error)
      }
    }

    let role2 = message.guild.roles.cache.find(role => role.name === 'skuneTempMuted')
    if (member.roles.cache.has(role2.id)) {
      const errorEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} хэрэглэгч ${ms(ms(time))} хугацаагаар түр muteлүүлсэн байна.\`\`\``)
      return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else {
      const reasonDm = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Та ${message.guild.name} серверээс ${ms(ms(time))} хугацаагаар түр muteлүүллээ.\`\`\``)
        .addFields(
          {
            name: 'Tempmute хийсэн',
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
      await member.roles.add(role2)

      const mutedEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийг ${ms(ms(time))} хугацаагаар түр mute хийлээ.\`\`\``)
      message.channel.send({ embeds: [mutedEmbed] })

      setTimeout(() => {
        member.roles.remove(role2)
      }, ms(time))
    }
  }
}
