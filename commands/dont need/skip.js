const { Util, MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
  name: "skip",
  description: "Энэ комманд нь дуугаа алгасахдаа ашигладаг.",
 

  async execute(message, args) {
    const channel = message.member.voice.channel
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
          description: `\`\`\`Дараалалд дуу байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2021. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

        if(!serverQueue.connection) return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Дууг амжилттай алгаслаа")
      .setColor("#679ad8")
      .setTitle("Дууг алгаслаа")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return message.reply({
          embed: {
              color: "#679ad8",
              description: `\`\`\`Дуу тоглуулагч зогсож, дараалалд байсан дуунууд цуцлагдлаа.\`\`\``,
              footer: {
                  text: "© 2021. 14K"
              }
          }
        })
      }
    message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`Тоглож байсан дууг амжилттай алгаслаа.\`\`\``,
        footer: {
          text: "© 2021. 14K"
        }
      }
    })
  },
};
