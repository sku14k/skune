const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  execute(message, args) {
    const embed = new Discord.MessageEmbed();

    if (!message.mentions.users.first()) {
      embed.setImage(
        message.author.displayAvatarURL({ dynamic: true, size: 512 })
      );
      embed.setColor("#679ad8");
      embed.setFooter("© 2022 14K");
      return message.channel
        .send(embed)
        .then(message.delete({ timeout: 8000 }));
    } else {
      const user = message.mentions.users.first();
      embed.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
      embed.setColor("#679ad8");
      embed.setFooter("© 2022 14K");
      return message.channel
        .send(embed)
        .then(message.delete({ timeout: 8000 }));
    }
  },
};
