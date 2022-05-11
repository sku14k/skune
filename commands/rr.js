const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'rr',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    if (!message.member.permissions.has('MANAGE_MEMBERS')) {
      const banError = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Танд rr командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MEMBERS')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад rr командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    const user = message.mentions.members.first()

    if (!user) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefix}rr [@Хэрэглэгч] [Role]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    const role = message.guild.roles.cache.find((r) => r.name === args.slice(1).join(' '))

    if (!role) {
      const roleEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Дурдсан role олдсонгүй эсвэл дурдсангүй.\`\`\``)
      return message.channel.send({ embeds: [roleEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    await user.roles.remove(role.id)

    const roledEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`${user.user.tag} хэрэглэгчээс ${role.name} roleийг хураалаа.\`\`\``)
    message.channel.send({ embeds: [roledEmbed] })
  }
}
