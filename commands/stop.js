const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
  name: "stop",
  description: "Энэ комманд нь дуугаа зогсооход ашигладаг.",
 

  async execute(message, args) {
    const channel = message.member.voice.channel
    if(!channel) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Та дуут сувагт холбогдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Дуу тоглуулагдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
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
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.guild.me.voice.channel.leave();
  },
};