const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");
const db = require('quick.db');

module.exports = {
  name: "remove",
  description: "Энэ комманд нь хүлээлгэнд байгаа дуугаа хасахад ашигладаг.",

  async execute(message, args) {
    let prefix;
		let prefixes = await db.fetch(`prefix_${message.guild.id}`);
	
		if(prefixes == null) {
			prefix = 'skune'
		} else {
			prefix = prefixes;
    }
   const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2021. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    if(!args.length) return message.reply({
			embed: {
				color: "#FFFF00",
				description: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}remove [Дараалалд байгаа дууны дугаар]. гэж дараалалд байгаа дууг дарааллаас гаргана.\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    
    if (isNaN(args[0])) return message.reply({
			embed: {
				color: "#FFFF00",
				description: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}remove [Дараалалд байгаа дууны дугаар]. гэж дараалалд байгаа дууг дарааллаас хасна.\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    
    if (queue.songs.length == 1) return message.reply({
			embed: {
				color: "#FF0000",
				description: `\`\`\`Дараалалд нэгээс өөр дуу байхгүй тул дараалалаас дуу хасах комманд ажиллаж чадсангүй.\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    if (args[0] > queue.songs.length)
      return message.reply({
        embed: {
          color: "#FF0000",
          description: `\`\`\`Дараалалд байгаа дуунуудын дугаар таараагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
            text: "© 2021. 14K"
          }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
try{
    const song = queue.songs.splice(args[0] - 1, 1);
    message.react("✅")
    message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`${song[0].title} дууг дарааллаас амжилттай хаслаа.\`\`\``,
        footer: {
          text: "© 2021. 14K"
        }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
} catch (error) {
        return message.reply({
          embed: {
              color: "#FF0000",
              description: `\`\`\`Гэнэтийн алдаа гарлаа.\`\`\``,
              footer: {
                  text: "© 2021. 14K"
              }
          }
        }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
      }
  },
};
