const { MessageEmbed } = require("discord.js");
const { execute } = require("./afk");
const db = require('quick.db');

module.exports = {
  name: "queue",
  description: "Энэ комманд нь ямар ямар дуунууд хүлээлэгэнд байгааг харахад ашигладаг.",

  async execute(message, args) {
  const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
      return message.reply({
        embed: {
            color: "#679ad8",
            description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
                text: "© 2020. 14K"
            }
        }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));

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

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**\`${currentPage + 1}\`**/**${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("🛑");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "🛑", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }
};

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");
  
    const serverQueue =message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
     .setAuthor("Серверт дараалалд байгаа дуунууд", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setThumbnail(message.guild.iconURL())
    .setColor("#679ad8")
    .setDescription(`${info}`)
    .addField("Одоо тоглож байгаа дуу", `[${queue[0].title}](${queue[0].url})`, true)
    .addField("Текст суваг", serverQueue.textChannel, true)
    .addField("Дуут суваг", serverQueue.voiceChannel, true)
    .setFooter("Серверийн дуу тоглуулагчийн дууны түвшин "+serverQueue.volume)
     if(serverQueue.songs.length === 1)embed.setDescription(`Дараа нь тоглох дуу алга.`)

    embeds.push(embed);
  }

  return embeds;
 
};
