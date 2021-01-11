const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: "daily",
  description: "daily",

  async execute(message, args) {
    let user = message.author;
    let timeout = 84600000;
    let amount = 100;

    let daily = await db.fetch(`daily_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      return message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Та аль хэдийнээ өнөөдрийн skune зоосыг цуглуулсан байна. ${time.days}өдөр, ${time.hours}цаг, ${time.minutes}минут, ${time.seconds}секундийн дараа өдрийн skune зоосыг цуглуулна уу.\`\`\``,
          footer: {
            text: "© 2021. 14K",
          }
        }
      });
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

      message.reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Та өнөөдрийн ${amount} skune зоосыг амжилттай цуглууллаа.\`\`\``,
          footer: {
            text: "© 2021. 14K",
          },
        }
      });
    }
  },
};
