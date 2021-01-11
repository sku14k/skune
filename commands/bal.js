const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "bal",
  description: "blah",

  async execute(message, args) {
    let user = message.mentions.users.first() || message.author;

    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
    if (bal === null) bal = 0;

    message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`${user} гишүүн ${bal}ш skune зоостой байна.`,
        footer: {
          text: "© 2021. 14K",
        },
      },
    });
  },
};
