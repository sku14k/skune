const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "say",
  description: "Энэ комманд нь ботоор мессеж бичүүлэх үүрэгтэй.",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#FFFF00",
            title: "Комманд ажиллуулах зөвлөмж :woman_tipping_hand:",
            description: `\`\`\`Энэ комманд нь ботоор мессеж бичүүлэх үүрэгтэй.\`\`\``,
            fields: [
              {
                name: "Зөвлөмж",
                value: `\`\`\`${prefix}say [Мессеж] эсвэл ${prefix}say embed [Мессеж] гэж бичсэнээр бот гишүүний бичсэн мессежийг бичнэ.\`\`\``,
              },
            ],
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    if (args[0].toLowerCase() === "embed") {
      const embed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setDescription(args.slice(1).join(" "));

      message.channel.send(embed).then(message.delete());
    } else {
      const sayMessage = args.join(" ");
      message.delete().catch((err) => console.log(err));
      message.channel.send(sayMessage);
    }
  },
};
