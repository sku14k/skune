const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  execute(client, message, args) {
    const Target = message.mentions.users.first() || message.author

    const avatarEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setImage(Target.displayAvatarURL({ dynamic: true, size: 256 }))
    message.channel.send({ embeds: [avatarEmbed] })
  }
}
