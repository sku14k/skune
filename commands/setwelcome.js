const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    let welcome;
    let welcomes = await db.fetch(`welchannel_${message.guild.id}`);

    let channel = message.mentions.channels.first();

    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setDescription(`\`\`\`${prefix}setwelcome [#Текст Суваг]\`\`\``)
        .setFooter("© 2022 14K");
      return message
        .reply(embed)
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));
    }

    await db.set(`welchannel_${message.guild.id}`, channel.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#679ad8")
      .setDescription(
        `\`\`\`Серверийн шинэ хэрэглэгч угтаж авах текст суваг #${channel.name} болж өөрчлөгдлөө.\`\`\``
      )
      .setFooter("© 2022 14K");
    message
      .reply(embed)
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
