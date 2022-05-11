const { Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'say',
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
        .setDescription(`\`\`\`Танд say командыг ашиглах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [clearError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      const permsEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Надад say командыг ажиллуулах permission байхгүй байна.\`\`\``)
      return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }

    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${prefxi}say [Мессеж]\n${prefix}say embed [Мессеж]\`\`\``)
      return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }

    if (args[0].toLowerCase() === "embed") {
      const embed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(args.slice(1).join(" "));

      message.channel.send({ embeds: [embed] }).then(message.delete());
    } else {
      const sayMessage = args.join(" ");
      message.delete().catch((err) => console.log(err));
      message.channel.send(sayMessage);
    }
  },
};
