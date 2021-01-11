const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setleave",
  description: "Энэ комманд нь серверийн хүн үдэх сувагийг өөрчилдөг.",
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
        .setColor("#FFFF00")
        .setTitle("Комманд ажиллуулах зөвлөмж :woman_tipping_hand:")
        .setDescription(
          `\`\`\`Энэ комманд нь серверийн гишүүн үдэж явуулах текст сувгийг өөрчилдөг.\`\`\``
        )
        .addFields({
          name: "Зөвлөмж",
          value: `\`\`\`${prefix}setleave [Текст Суваг] гэж бичсэнээр серверийн гишүүн үдэж явуулах текст суваг өөрчлөгдөнө.\`\`\``,
        })
        .setFooter("© 2021. 14K");
      return message
        .reply(embed)
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));
    }

    db.set(`leachannel_${message.guild.id}`, channel.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#679ad8")
      .setTitle("Комманд амжилттай ажиллаа :white_check_mark:")
      .setDescription(
        `\`\`\`Серверийн гишүүн үдэж явуулах текст суваг амжилттай #${channel.name} болж өөрчлөгдлөө.\`\`\``
      )
      .setFooter("© 2021. 14K");
    message
      .reply(embed)
      .then((m) => m.delete({ timeout: 60000 }))
      .then(message.delete({ timeout: 60000 }));
  },
};
