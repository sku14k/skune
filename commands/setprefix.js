const db = require("quick.db");

module.exports = {
  name: "setprefix",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    await db.set(`prefix_${message.guild.id}`, args[0]);

    message
      .reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Команд тэмдэг ${args[0]} болж өөрчлөгдлөө.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
