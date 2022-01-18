const { Message } = require("discord.js");
const { execute } = require("./clear");
const db = require("quick.db");

module.exports = {
  name: "unmute",
  /**
   * @param {Message} message
   */
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

    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member)
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}unmute [@Хэрэглэгч]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    const role = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "хэлгүй хүн"
    );

    await Member.roles.remove(role);

    message
      .reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`${Member.displayName} хэрэглэгчд чат бичих эрх олголоо.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
