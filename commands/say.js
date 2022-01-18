const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "say",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#FFFF00",
            description: `\`\`\`${prefix}say [Мессеж] эсвэл ${prefix}say embed [Мессеж]\`\`\``,
            footer: {
              text: "© 2022 14K",
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
