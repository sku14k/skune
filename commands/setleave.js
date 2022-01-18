const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setleave",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    let channel = message.mentions.channels.first();

    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setDescription(
          `\`\`\`${prefix}setleave [#Текст Суваг]\`\`\``
        )
        .setFooter("© 2022 14K");
      return message
        .reply(embed)
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));
    }

    db.set(`leachannel_${message.guild.id}`, channel.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#679ad8")
      .setDescription(
        `\`\`\`Серверийн хэрэглэгч үдэж явуулах текст суваг #${channel.name} болж өөрчлөгдлөө.\`\`\``
      )
      .setFooter("© 2022 14K");
    message
      .reply(embed)
      .then((m) => m.delete({ timeout: 60000 }))
      .then(message.delete({ timeout: 60000 }));
  },
};
