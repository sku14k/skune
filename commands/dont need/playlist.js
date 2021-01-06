const {
	Util,
	MessageEmbed
} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
var ytpl = require('ytpl');
const fs = require('fs');
const { execute } = require("./afk");
const db = require('quick.db');

module.exports = {
	name: "playlist",
	description: "Энэ комманд нь дуугаа тоглуулахад ашигладаг.",

	async execute(message, args) {
		let prefix;
		let prefixes = await db.fetch(`prefix_${message.guild.id}`);
	
		if(prefixes == null) {
			prefix = 'skune'
		} else {
			prefix = prefixes;
		}
		
		const channel = message.member.voice.channel;
		if (!channel) return message.reply({
			embed: {
				color: "#FF0000",
				description: `\`\`\`Та дуут сувагт холбогдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
		}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

		const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
		var searchString = args.join(" ");
		const permissions = channel.permissionsFor(message.client.user);

		if (!permissions.has("CONNECT")) return message.reply({
			embed: {
				color: "#FF0000",
				description: `\`\`\`Надад дуут сувагт холбогдох эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
		}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

		if (!permissions.has("SPEAK")) return message.reply({
		embed: {
			color: "#FF0000",
			description: `\`\`\`Надад дуут сувагт дуугарах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
			footer: {
				text: "© 2021. 14K"
			}
		}
		}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

		if (!searchString||!url) return message.reply({
			embed: {
				color: "#FFFF00",
				description: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}playlist [Ютүйб тоглуулах жагсаалт эсвэл тоглуулах жагсаалтын нэр].\`\`\``,
				footer: {
					text: "© 2021. 14K"
				}
			}
		}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
		
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			try {
				const playlist = await ytpl(url.split("list=")[1]);
				if (!playlist) return message.reply({
					embed: {
						color: "#FF0000",
						description: `\`\`\`Тоглуулах жагсаалт олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
						footer: {
							text: "© 2021. 14K"
						}
					}
				}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				return message.channel.send({
					embed: {
						color: "#679ad8",
						description: `✅ Тоглуулах жагсаалт: **\`${videos[0].title}\`** амжилттай хүлээлгэнд орлоо.`
					}
				})
			} catch (error) {
				console.error(error);
				return message.reply({
					embed: {
						color: "#FF0000",
						description: `\`\`\`Тоглуулах жагсаалт олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
						footer: {
							text: "© 2021. 14K"
						}
					}
				}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
			}
		} else {
			try {
				var searched = await yts.search(searchString)

				if (searched.playlists.length === 0) return message.replace({
					embed: {
						color: "#FF0000",
						description: `\`\`\`Тоглуулах жагсаалт Ютүйбээс олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
						footer: {
							text: "© 2021. 14K"
						}
					}
				}).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

				var songInfo = searched.playlists[0];
				let listurl = songInfo.listId;
				const playlist = await ytpl(listurl)
				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				let thing = new MessageEmbed()
					.setAuthor("Тоглуулах жагсаалтыг дараалалд нэмлээ", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
					.setThumbnail(songInfo.thumbnail)
					.setColor("#679ad8")
					.setDescription(`✅ Тоглуулах жагсаалт: **\`${songInfo.title}\`** \`${songInfo.videoCount}\``)
				return message.channel.send(thing)
			} catch (error) {
				return essage.reply({
					embed: {
						color: "#FF0000",
						description: `\`\`\`Гэнэтийн алдаа гарлаа.\`\`\``,
						footer: {
							text: "© 2021. 14K"
						}
					}
				  }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
			}
		}

		async function handleVideo(video, message, channel, playlist = false) {
			const serverQueue = message.client.queue.get(message.guild.id);
			const song = {
				id: video.id,
				title: Util.escapeMarkdown(video.title),
				views: video.views ? video.views : "-",
				ago: video.ago ? video.ago : "-",
                                duration: video.duration,
				url: `https://www.youtube.com/watch?v=${video.id}`,
				img: video.thumbnail,
				req: message.author
			};
			if (!serverQueue) {
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

				try {
					var connection = await channel.join();
					queueConstruct.connection = connection;
					play(message.guild, queueConstruct.songs[0]);
				} catch (error) {
					console.error(`Би дуут сувагт холбогдож чадсангүй: ${error}`);
					message.client.queue.delete(message.guild.id);
					return message.reply({
						embed: {
							color: "#FF0000",
							description: `\`\`\`Би дуут сувагт холбогдож чадсангүй.\`\`\``,
							footer: {
								text: "© 2021. 14K"
							}
						}
					  }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

				}
			} else {
				serverQueue.songs.push(song);
				if (playlist) return;
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
			return;
		}

async	function play(guild, song) {
			const serverQueue = message.client.queue.get(message.guild.id);
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
					text: "© 2021. 14K"
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
        if (serverQueue) {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
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
       }
     });
}
 
      serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
			const dispatcher = serverQueue.connection
         .play(ytdl(song.url,{quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })

    dispatcher.setVolume(serverQueue.volume / 100);
let thing = new MessageEmbed()
				.setAuthor("Дуу тоглуулж эхэллээ.", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
				.setThumbnail(song.img)
				.setColor("#679ad8")
				.addField("Дууны нэр", song.title, true)
				.addField("Дууны хугацаа", song.duration, true)
				.addField("Дууг захиалсан", song.req.tag, true)
				.setFooter(`Үзэлтийн тоо: ${song.views} | ${song.ago}`)
    serverQueue.textChannel.send(thing);
}


	},



};
