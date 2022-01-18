const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const { execute } = require("./clear");
const db = require("quick.db");

module.exports = {
  name: "mute",
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

    if (!Member) return message
    .reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`${prefix}mute [@Хэрэглэгч]\`\`\``,
        footer: {
          text: "© 2022 14K",
        },
      },
    })
    .then((m) => m.delete({ timeout: 60000 }))
    .then(message.delete({ timeout: 60000 }));

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "дуугүй"
    );
    if (!role) {
      try {
        let muterole = await message.guild.roles.create({
          data: {
            name: "дуугүй",
            permissions: [],
          },
        });
        message.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
    let role2 = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "дуугүй"
    );
    if (Member.roles.cache.has(role2.id))
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${Member.displayName} хэрэглэгч чат бичих эрхгүй.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    await Member.roles.add(role2);
    message
      .reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`${Member.displayName} хэрэглэгчийн чат бичих эрхийг хураалаа.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
