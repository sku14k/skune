const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "ban",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return;

    let reason = args.slice(1).join(" ");
    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!reason) reason = "Шалтгаангүй.";

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}ban [@Хэрэглэгч] [Шалтгаан]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    if (!mentionedMember)
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`Хэрэглэгч серверт байхгүй эсвэл та дурдсангүй.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (!mentionedMember.bannable) return;

    var date = `${message.createdAt.getFullYear()} оны ${
      message.createdAt.getMonth() + 1
    }-р сарын ${message.createdAt.getDate()}-нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`;

    const banEmbed = new Discord.MessageEmbed()
      .setDescription(
        `\`\`\`Танд ${message.guild.name} серверээс хориг тавьсан тул та серверлүү орж чадахгүй.\`\`\``
      )
      .addFields(
        {
          name: `Шалтгаан`,
          value: `\`\`\`${reason}\`\`\``,
        },
        {
          name: `Хэзээ`,
          value: `\`\`\`${date}\`\`\``,
        }
      )
      .setColor("#679ad8")
      .setFooter("© 2022 14K");
    await mentionedMember.send(banEmbed).catch((err) => console.log(err));
    await mentionedMember
      .ban({
        days: 7,
        reason: reason,
      })
      .catch((err) => console.log(err))
      .then(() =>
        message
          .reply({
            embed: {
              color: "#679ad8",
              description: `\`\`\`${mentionedMember.user.tag} хэрэглэгчд хориг тавьлаа.\`\`\``,
              footer: {
                text: "© 2022 14K",
              },
            },
          })
          .then((m) => m.delete({ timeout: 15000 }))
          .then(message.delete({ timeout: 15000 }))
      );
  },
};
