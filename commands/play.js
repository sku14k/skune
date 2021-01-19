const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");
const db = require("quick.db");

module.exports = {
  name: "play",
  description: "Энэ комманд нь дуугаа тоглуулахад ашигладаг.",

  async execute(message, args) {
    let channel = message.member.voice.channel;

    if (!channel)
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Та дуут сувагт холбогдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));

    const permissions = channel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Надад дуут сувагт холбогдох эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));

    if (!permissions.has("SPEAK"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Надад дуут сувагт дуугарах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));

    var searchString = args.join(" ");

    if (!searchString)
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Тоглуулах дуугаа дурдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));

    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    var serverQueue = message.client.queue.get(message.guild.id);

    let songInfo = null;
    let song = null;
    if (
      url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)
    ) {
      try {
        songInfo = await ytdl.getInfo(url);
        if (!songInfo)
          return message
            .reply({
              embed: {
                color: "#FF0000",
                description: `\`\`\`Таны дурдсан дуу Ютүйбээс олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                  text: "© 2021. 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 10000 }))
            .then(message.delete({ timeout: 10000 }));

        song = {
          id: songInfo.videoDetails.videoId,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          img:
            songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
          duration: songInfo.videoDetails.lengthSeconds,
          ago: songInfo.videoDetails.publishDate,
          views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
          req: message.author,
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        var searched = await yts.search(searchString);
        if (searched.videos.length === 0)
          return message
            .reply({
              embed: {
                color: "#FF0000",
                description: `\`\`\`Таны дурдсан дууг Ютүйбээс олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                  text: "© 2021. 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 10000 }))
            .then(message.delete({ timeout: 10000 }));

        songInfo = searched.videos[0];
        song = {
          id: songInfo.videoId,
          title: Util.escapeMarkdown(songInfo.title),
          views: String(songInfo.views).padStart(10, " "),
          url: songInfo.url,
          ago: songInfo.ago,
          duration: songInfo.duration.toString(),
          img: songInfo.image,
          req: message.author,
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setAuthor(
          "Дууг дараалалд нэмлээ",
          "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
        )
        .setThumbnail(song.img)
        .setColor("#679ad8")
        .addField("Дууны нэр", song.title, true)
        .addField("Дууны хугацаа", song.duration, true)
        .addField("Дууг захиалсан", song.req.tag, true)
        .setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`);
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
      if (!afk[message.guild.id])
        afk[message.guild.id] = {
          afk: false,
        };
      var online = afk[message.guild.id];
      if (!song) {
        if (!online.afk) {
          let prefix;
          let prefixes = await db.fetch(`prefix_${message.guild.id}`);

          if (prefixes == null) {
            prefix = "skune";
          } else {
            prefix = prefixes;
          }

          message.channel
            .send({
              embed: {
                color: "#679ad8",
                description: `\`\`\`Дараалалд байсан бүх дуунууд тоглогдож дууссан тул би гарлаа. Хэрвээ та намайг дуут сувагт 24/7 байлгамаар бол ${prefix}afk гэж бичээрэй.\`\`\``,
                footer: {
                  text: "© 2021. 14K",
                },
              },
            })
            .then((m) => m.delete({ timeout: 10000 }))
            .then(message.delete({ timeout: 10000 }));
          message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
          message.client.queue.delete(message.guild.id);
        }
        return message.client.queue.delete(message.guild.id);
      }
      let stream = null;
      if (song.url.includes("youtube.com")) {
        stream = await ytdl(song.url);
        stream.on("error", function (er) {
          if (er) {
            if (queue) {
              queue.songs.shift();
              play(queue.songs[0]);
              return message
                .reply({
                  embed: {
                    color: "#FF0000",
                    description: `\`\`\`Гэнэтийн алдаа гарлаа.\`\`\``,
                    footer: {
                      text: "© 2021. 14K",
                    },
                  },
                })
                .then((m) => m.delete({ timeout: 10000 }))
                .then(message.delete({ timeout: 10000 }));
            }
          }
        });
      }
      queue.connection.on("disconnect", () =>
        message.client.queue.delete(message.guild.id)
      );

      const dispatcher = queue.connection
        .play(
          ytdl(song.url, {
            quality: "highestaudio",
            highWaterMark: 1 << 25,
            type: "opus",
          })
        )
        .on("finish", () => {
          const shiffed = queue.songs.shift();
          if (queue.loop === true) {
            queue.songs.push(shiffed);
          }
          play(queue.songs[0]);
        });

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor(
          "Дуу тоглуулж эхэллээ.",
          "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
        )
        .setThumbnail(song.img)
        .setColor("#679ad8")
        .addField("Дууны нэр", song.title, true)
        .addField("Дууны хугацаа", song.duration, true)
        .addField("Дууг захиалсан", song.req.tag, true)
        .setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`);
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Би дуут сувагт холбогдож чадсангүй: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Би дуут сувагт холбогдож чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 10000 }))
        .then(message.delete({ timeout: 10000 }));
    }
  },
};
