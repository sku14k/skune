const discord = require("discord.js");
module.exports = {
  name: "rps",
  async execute(message, args) {
    let embed = new discord.MessageEmbed()
      .setDescription("Хайч, Чулуу, Даавуу")
      .setColor("#679ad8")
      .setFooter("© 2022 14K");
    let msg = await message.channel.send(embed);
    await msg.react(":rock:");
    await msg.react("✂");
    await msg.react("📰");

    const filter = (reaction, user) => {
      return (
        [":rock:", "✂", "📰"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    const choices = [":rock:", "✂", "📰"];
    const me = choices[Math.floor(Math.random() * choices.length)];
    msg
      .awaitReactions(filter, { max: 1, time: 60000, error: ["time"] })
      .then(async (collected) => {
        const reaction = collected.first();
        let result = new discord.MessageEmbed()
          .setColor("#679ad8")
          .addField("Таны гаргасан", `${reaction.emoji.name}`)
          .addField("Миний гаргасан", `${me}`)
          .setFooter("© 2022 14K");
        await msg.edit(result);
        if (
          (me === ":rock:" && reaction.emoji.name === "✂") ||
          (me === "📰" && reaction.emoji.name === ":rock:") ||
          (me === "✂" && reaction.emoji.name === "📰")
        ) {
          message.reply("Та хожигдлоо");
        } else if (me === reaction.emoji.name) {
          return message.reply("Тэнцлээ");
        } else {
          return message.reply("Та хожлоо");
        }
      })
      .catch((collected) => {
        message.reply("Цуцлагдлаа");
      });
  },
};
