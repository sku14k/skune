const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
  name: "np",
  description: "Энэ комманд нь одоо ямар дуу явж байгааг харахад ашигладаг.",

  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));

    let song = serverQueue.songs[0];
    let thing = new MessageEmbed()
      .setAuthor(
        "Одоо тоглож байгаа дуу",
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
      )
      .setThumbnail(song.img)
      .setColor("#679ad8")
      .addField("Дууны нэр", song.title, true)
      .addField("Дууны хугацаа", song.duration, true)
      .addField("Дууг захиалсан", song.req.tag, true)
      .setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`);
    return message.channel.send(thing);
  },
};
