const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
  name: "resume",
  description: "Энэ комманд нь түр зогссон дууг үргэлжлүүлэхэдээ ашигладаг.",

  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
        .setDescription("▶ Түр зогсоосон дууг амжилттай үргэлжлүүллээ")
        .setColor("#679ad8")
        .setAuthor(
          "Түр зогсоосон дууг үргэлжлүүллээ",
          "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
        );
      return message.channel.send(xd);
    }
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
  },
};
