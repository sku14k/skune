const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sr",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return;

    if (!message.guild.me.hasPermission("MANAGE_MEMBERS")) return;

    const user = message.mentions.members.first();

    if (!user)
      return message
        .reply({
          embed: {
            color: "#FFFF00",
            description: `\`\`\`${prefix}sr [@Хэрэглэгч] [Ажил Үүрэг]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    const role = message.guild.roles.cache.find(
      (r) => r.name === args.slice(1).join(" ")
    );

    if (!role)
      return message
        .reply({
          embed: {
            color: "#FFFF00",
            description: `\`\`\`Дурдсан ажил үүрэг олдсонгүй эсвэл дурдсангүй.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    if (user.roles.cache.has(role.id))
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`Хэрэглэгч аль хэдийнээ ${role.name} ажил үүрэгтэй байна.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    await user.roles.add(role.id),
      message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${user.user.tag} хэрэглэгчд ${role.name} ажил үүрэг олголоо.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));
  },
};
