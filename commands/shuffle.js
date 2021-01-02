const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
  name: "shuffle",
  description: "Энэ комманд нь дуугаа давтуулахдаа ашигладаг.",

  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Дараалалд дуу байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
try{
    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`Дараалалд байгаа дуунуудыг амжилттай давтууллаа.\`\`\``,
        footer: {
          text: "© 2020. 14K"
        }
      }
    })

      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return message.reply({
          embed: {
              color: "#679ad8",
              description: `\`\`\`Дуу тоглуулагч зогсож, дараалалд байсан дуунууд цуцлагдлаа.\`\`\``,
              footer: {
                  text: "© 2020. 14K"
              }
          }
        })
     }
  },
};
