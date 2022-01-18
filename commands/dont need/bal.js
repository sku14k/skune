const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "bal",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (db.get(`user_${message.author.id}.bal`) === null) {
      message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Та эхлээд банканд данс нээлгэх ёстой. ${prefix}start гэж бичсэнээр данс нээгдэнэ.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      });
    } else {
      let bal = db.get(`user_${message.author.id}.bal`);

      message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Танд ${bal} ширхэг skune зоос байна.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      });
    }
  },
};
