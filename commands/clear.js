const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "clear",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}clear [Мөр Мессежийн Хэмжээ]\`\`\``,
            footer: {
              text: "© 2022. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    if (isNaN(args[0])) return;

    if (args[0] < 1) return;

    await message.channel.messages
      .fetch({ limit: args[1] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
        message
          .reply({
            embed: {
              color: "#679ad8",
              description: `\`\`\`${
                messages.size - 1
              } мөр мессеж амжилттай усгадлаа.\`\`\``,
              footer: {
                text: "© 2022 14K",
              },
            },
          })
          .then((m) => m.delete({ timeout: 15000 }));
      });
  },
};
