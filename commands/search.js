const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const YouTube = require("youtube-sr");
const fs = require('fs');
const { execute } = require("./afk");

module.exports = {
  name: "search",
  description: "Энэ комманд нь дуугаа хайхдаа ашигладаг.",
  
  async execute(message, args) {
    let channel = message.member.voice.channel;
    if(!channel) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Та дуут сувагт холбогдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    const permissions = channel.permissionsFor(message.client.user);

    if(!permissions.has("CONNECT")) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Надад дуут сувагт холбогдох эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    if(!permissions.has("SPEAK")) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Надад дуут сувагт дуугарах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    var searchString = args.join(" ");
    if(!searchString) return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Хайх дуугаа дурдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2020. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

    var serverQueue = message.client.queue.get(message.guild.id);
    try {
           var searched = await YouTube.search(searchString, { limit: 10 });
          if(searched[0] == undefined) return message.reply({
            embed: {
                color: "#FF0000",
                description: `\`\`\`Таны дурдсан дууг Ютүйбээс олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2020. 14K"
                }
            }
          }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
                    let index = 0;
                    let embedPlay = new MessageEmbed()
                        .setColor("#679ad8")
                        .setAuthor(`Илэрц \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                        .setDescription(`${searched.map(video2 => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                        .setFooter("Дууны тоог бичээд тоглууна уу.");
                    // eslint-disable-next-line max-depth
                    message.channel.send(embedPlay).then(m => m.delete({
                        timeout: 15000
                    }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send({
                            embed: {
                                color: "#FF0000",
                                description: "Хорин секундад амжиж сонгоогүй тул комманд ажиллаж чадсангүй.",
                                footer: {
                                  text: "© 2020. 14K"
                              }
                            }
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await (searched[videoIndex - 1])
		    
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: "#FF0000",
                            description: "🆘 Би хайлтын үр дүнг олж чадаагүй тул комманд ажиллаж чадсангүй."
                        }
                    });
                }
            
            response.delete();
  var songInfo = video

    const song = {
      id: songInfo.id,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      ago: songInfo.uploadedAt,
      duration: songInfo.durationFormatted,
      url: `https://www.youtube.com/watch?v=${songInfo.id}`,
      img: songInfo.thumbnail.url,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Дууг дараалалд нэмлээ", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("#679ad8")
      .addField("Дууны нэр", song.title, true)
      .addField("Дууны хугацаа", song.duration, true)
      .addField("Дууг захиалсан", song.req.tag, true)
      .setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

   const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        message.channel.send({
          embed: {
              color: "#679ad8",
              description: `\`\`\`Дараалалд байсан бүх дуунууд тоглогдож дууссан тул би гарлаа. Хэрвээ та намайг дуут сувагт 24/7 байлгамаар бол ${prefix}afk гэж бичээрэй.\`\`\``,
              footer: {
                  text: "© 2020. 14K"
              }
          }
        }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

        message.guild.me.voice.channel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
      }
            return message.client.queue.delete(message.guild.id);
}
let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
  	  return message.reply({
        embed: {
            color: "#FF0000",
            description: `\`\`\`Гэнэтийн алдаа гарлаа.\`\`\``,
            footer: {
                text: "© 2020. 14K"
            }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

       }
      }
    });  
}
 
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
      .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0]);
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setAuthor("Дуу тоглуулж эхэллээ", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("#679ad8")
      .addField("Дууны нэр", song.title, true)
      .addField("Дууны хугацаа", song.duration, true)
      .addField("Дууг захиалсан", song.req.tag, true)
      .setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true)
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Би дуут сувагт холбогдож чадсангүй: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.reply({
        embed: {
            color: "#FF0000",
            description: `\`\`\`Би дуут сувагт холбогдож чадсангүй.\`\`\``,
            footer: {
                text: "© 2020. 14K"
            }
        }
      }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
    }
 
  },

};
