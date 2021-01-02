const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const { execute } = require("./afk");

module.exports = {
    name: "lyrics",
    description: "Энэ комманд нь дууны үг харахад ашигладаг.",
 

  async execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) return message.reply({
        embed: {
          color: "#FF0000",
          description: `\`\`\`${queue.songs[0].title} дууны үг олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
            text: "© 2020. 14K"
          }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    } catch (error) {
      message.reply({
        embed: {
          color: "#FF0000",
          description: `\`\`\`${queue.songs[0].title} дууны үг олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
            text: "© 2020. 14K"
          }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    }

    var date = `${message.createdAt.getFullYear()} оны ${(message.createdAt.getMonth()+1)}-р сарын ${message.createdAt.getDate()}-нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минут`;

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} — Үг`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(queue.songs[0].img)
      .setColor("#679ad8")
      .setDescription(lyrics)
      .setFooter("© 2020. 14K");

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
