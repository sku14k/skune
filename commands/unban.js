const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "unban",
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

    let target = args[0];

    if (!reason) reason = `Бан гаргасан ${message.author.tag}`;
    if (!target)
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}unban [@Хэрэглэгч] [Шалтгаан]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    message.guild.fetchBans().then(async (bans) => {
      if (bans.size == 0)
        return message
          .reply({
            embed: {
              color: "#679ad8",
              description: `\`\`\`Серверээс хориг тавьсан хэрэглэгч олдсонгүй.\`\`\``,
              footer: {
                text: "© 2022 14K",
              },
            },
          })
          .then((m) => m.delete({ timeout: 15000 }))
          .then(message.delete({ timeout: 15000 }));

      bans.forEach((u) => {
        if (target === u.user.username) {
          message
            .reply({
              embed: {
                color: "#679ad8",
                description: `\`\`\`${u.user.username} хэрэглэгчийн серверээс тавьсан хоригийг гаргалаа.\`\`\``,
                footer: {
                  text: "© 2022 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 15000 }))
            .then(message.delete({ timeout: 15000 }));
          message.guild.members.unban(u.user.id, reason);
        } else if (target === u.user.id) {
          message
            .reply({
              embed: {
                color: "#679ad8",
                description: `\`\`\`${u.user.username} хэрэглэгчийн серверээс тавьсан ID хоригийг гаргалаа.\`\`\``,
                footer: {
                  text: "© 2022 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 15000 }))
            .then(message.delete({ timeout: 15000 }));
          message.guild.memebers.unban(u.user.id, reason);
        } else {
          return message
            .reply({
              embed: {
                color: "#679ad8",
                description: `\`\`\`${u.user.username} хэрэглэгчд серверээс хориг тавиагүй байна.\`\`\``,
                footer: {
                  text: "© 2022 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 15000 }))
            .then(message.delete({ timeout: 15000 }));
        }
      });
    });
  },
};
