const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "start",
  description: "creates an acc for the user",
  execute(message, args) {
    if (db.get(`user_${message.author.id}.bal`) === null) {
      db.set(`user_${message.author.id}`, { bal: 0, xp: 0, inv: [] });
      message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Танд амжилттай данс нээлээ\`\`\``,
          footer: {
            text: "© 2021. 14K",
          },
        },
      });
    } else {
      message.reply({
        embed: {
          color: "#FF0000",
          description: `\`\`\`Танд данс нээгдсэн байна.\`\`\``,
          footer: {
            text: "© 2021. 14K",
          },
        },
      });
    }
  },
};
