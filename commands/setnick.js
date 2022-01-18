const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setnick",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("CHANGE_NICKNAME")) return;
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return;

    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}setnick [@Хэрэглэгч] [Хоч]\`\`\``,
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
    if (!nickName) return;
    if (!mentionedMember.kickable) return;

    await mentionedMember.setNickname(nickName).then(() =>
      message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${mentionedMember.user.tag} хэрэглэгчийн хочийг ${nickName} болгож өөрчиллөө.\`\`\``,
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
