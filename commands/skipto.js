const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");
const db = require('quick.db');

module.exports = {
  name: "skipto",
  description: "Энэ комманд нь хүлээлгэнд байгаа дууг тоглуулахдаа ашигладаг.",

  async execute(message, args) {
    let prefix;
		let prefixes = await db.fetch(`prefix_${message.guild.id}`);
	
		if(prefixes == null) {
			prefix = 'skune'
		} else {
			prefix = prefixes;
    }
    
    if (!args.length || isNaN(args[0]))
      return message.reply({
                        embed: {
                            color: "#FFFF00",
                            description: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}skipto [Дараалалд байгаа дууны дугаар]\`\`\``
                        }
   
                   }).catch(console.error);
        

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

    if (args[0] > queue.songs.length)
      return message.reply({
        embed: {
          color: "#FF0000",
          description: `\`\`\`Дараалалд байгаа дуунуудын дугаар таараагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
            text: "© 2020. 14K"
          }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
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
    
    queue.textChannel.send({
                        embed: {
                            color: "#679ad8",
                            description: `⏭ \`${args[0] - 1}\` дууг амжилттай алгаслаа.`,
                            footer: {
                              text: "© 2020. 14K"
                            }
                        }
   
                   }).catch(console.error);

  },
};
