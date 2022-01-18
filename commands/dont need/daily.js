const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const cooldown = new Set();

module.exports = {
  name: "daily",
  execute(message, args) {
    if (db.get(`user_${message.author.id}.bal`) === null) {
      message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Та эхлээд банканд данс нээлгэх ёстой. ${prefix}start гэж бичсэнээр данс нээгдэнэ.\`\`\``,
          footer: {
            text: "© 2021. 14K",
          },
        },
      });
    } else {
      if (cooldown.has(`daily_${message.author.id}`)) {
        message.reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Та маргааш skune зоосыг цуглуулна уу.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        });
      } else {
        let rand = Math.floor(Math.random() * (1000 - 500) + 500);

        db.add(`user_${message.author.id}.bal`, rand);

        message.reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`Та ${rand} ширхэг skune зоос авлаа\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        });

        cooldown.add(`daily_${message.author.id}`);

        setTimeout(() => {
          cooldown.delete(`daily_${message.author.id}`);
        }, 8.64e7);
      }
    }
  },
};
