const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'purge',
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
        .setDescription(`\`\`\`Танд purge командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад purge командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}purge [Мөр Мессежийн Хэмжээ]\n${prefix}purge [@Хэрэглэгч]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    const member = message.mentions.members.first()

    if (member) {
      const userMessages = (await messages).filter((m) => m.author.id === member.id)

      await message.channel.bulkDelete(userMessages)
      const purgeEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${member.user.tag} хэрэглэгчийн мессежүүдийг устгалаа.\`\`\``)
      message.channel.send({ embeds: [purgeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else {
      const amount = args.length ? parseInt(args.shift()) : 10

      if (message) {
        await message.delete()
      }

      const messages = await message.channel.messages.fetch({ limit: amount })
      const { size } = messages

      messages.forEach((message) => message.delete())

      const deleteEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${size} мөр мессеж устгалаа.\`\`\``)

      message.channel.send({ embeds: [deleteEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
  }
}
