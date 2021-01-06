const { MessageEmbed } = require("discord.js");
const { execute, description } = require("./afk");

module.exports = {
  name: "volume",
  description: "Энэ комманд нь дууныхаа дууг чангалахдаа ашигладаг.",
 

  async execute(message, args) {
    const channel = message.member.voice.channel;
    if(!channel) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Та дуут сувагт холбогдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2021. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Дуу тоглуулагдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2021. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    if(!args[0]) return message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`Одоо байгаа дуу тоглуулагчийн дууны түвшин: ${serverQueue.volume}\`\`\``,
        footer: {
          text: "© 2021. 14K"
        }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

     if(isNaN(args[0])) return message.reply({
       embed: {
         color: "#FF0000",
         description: `\`\`\`Дуу тоглуулагчийн дууны түвшинг өөрчлөх түвшингийн тоог оруулаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
         footer: {
          text: "© 2021. 14K"
         }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return message.reply({
      embed: {
        color: "#FF0000",
        description: `\`\`\`Дуу тоглуулагчийн дууны түвшинг өөрчлөх түвшингийн тоо 150с дээш эсвэл 0с доош байсан тул комманд.\`\`\``,
        footer: {
          text: "© 2021. 14K"
        }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`\`\`\`Дууны хэмнэл: ${args[0]/1}/100 болж өөрчлөгдлөө\`\`\``)
    .setAuthor("Серверийн дуу тоглуулагчийн дууны түвшин", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("#679ad8")
    .setFooter("© 2021. 14K")
    return message.channel.send(xd);
  },
};
