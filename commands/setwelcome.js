const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  description: "Энэ комманд нь серверийн угтаж авах сувгийг өөрчилдөг.",
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
        .setColor("#FFFF00")
        .setTitle("Комманд ажиллуулах зөвлөмж :woman_tipping_hand:")
        .setDescription(
          "```Энэ комманд нь серверийн шинэ гишүүн угтаж авах текст сувгийг өөрчилдөг.```"
        )
        .addFields({
          name: "Зөвлөмж",
          value: `\`\`\`${prefix}setwelcome [Текст Суваг] гэж бичсэнээр серверийн шинэ гишүүн угтаж авах текст суваг өөрчлөгдөнө.\`\`\``,
        })
        .setFooter("© 2021. 14K");
      return message
        .reply(embed)
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));
    }

    await db.set(`welchannel_${message.guild.id}`, channel.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#679ad8")
      .setTitle("Комманд амжилттай ажиллаа :smile:")
      .setDescription(
        `\`\`\`Серверийн шинэ гишүүн угтаж авах текст суваг амжилттай #${channel.name} болж өөрчлөгдлөө.\`\`\``
      )
      .setFooter("© 2021. 14K");
    message
      .reply(embed)
      .then((m) => m.delete({ timeout: 60000 }))
      .then(message.delete({ timeout: 60000 }));
  },
};
