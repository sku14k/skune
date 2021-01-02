const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");

module.exports = {
    name: "pause",
    description: "Энэ комманд нь дуугаа түр зогсооход ашигладаг.",

  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
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
      let xd = new MessageEmbed()
      .setDescription("⏸ Дууг амжилттай түр зогсоолоо")
      .setColor("#679ad8")
      .setTitle("Дуу түр зогслоо")
      return message.channel.send(xd);
    }
    return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
  },
};
