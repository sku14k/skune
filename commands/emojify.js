const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'emojify',
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
        .setDescription(`\`\`\`Танд emojify командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад emojify командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!args.length) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}emojify [Мессеж]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    const specialCodes = {
      0: ':zero:',
      1: ':one:',
      2: ':two:',
      3: ':three:',
      4: ':four:',
      5: ':five:',
      6: ':six:',
      7: ':seven:',
      8: ':eight:',
      9: ':nine:',
      '#': ':hash:',
      '*': ':asterisk:',
      '?': ':grey_question:',
      '!': ':grey_exclamation:',
      ' ': '   ',
    }
    const text = args.join(' ').toLowerCase().split('').map((letter) => {
      if (/[a-z]/g.test(letter)) {
        return `:regional_indicator_${letter}:`
      } else if (specialCodes[letter]) {
        return `${specialCodes[letter]}`
      } return letter;
    }).join('')

    message.channel.send(text).then(message.delete())
  }
}
