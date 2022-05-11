const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'setprefix',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    if (!message.member.permissions.has('MANAGE_GUILD')) {
      const permsError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд setprefix командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_GUILD')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад setprefix командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    await db.set(`prefix_${message.guild.id}`, args[0])

    const prefixEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`Командын угтвар тэмдэг ${args[0]} болж өөрчлөгдлөө.\`\`\``)
    message.channel.send({ embeds: [prefixEmbed] })
  }
}
