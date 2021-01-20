const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const rdb = require("./reconDB");
const words = require("./as.json");
const fetch = require('node-fetch');
require('dotenv-flow').config();

const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER
};

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`${client.user.username} аслаа.`);
  client.user.setActivity(`skunehelp | skunebot.com`);
});

client.on("message", async (message) => {
  let prefix;
  let prefixes = await db.fetch(`prefix_${message.guild.id}`);

  if (prefixes == null) {
    prefix = "skune";
  } else {
    prefix = prefixes;
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!message.client.commands.has(command))
    return message.reply({
      embed: {
        color: "#ff0000",
        description: `\`\`\`Таны бичсэн команд үсгийн алдаатай эсвэл олдоогүй тул та <${prefix}help> гэж бичсэнээр тусламж авах боломжтой.\`\`\``,
        footer: {
          text: "© 2021. 14K",
        },
      },
    });
  try {
    message.client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply({
      embed: {
        color: "#FF0000",
        description: `\`\`\`Таны ажиллуулах гэсэн команд засвартай байгаа тул ажиллаж чадсангүй.\`\`\``,
        footer: {
          text: "© 2021. 14K",
        },
      },
    });
  }
});

client.on("message", async (message) => {
  let prefix;
  let prefixes = await db.fetch(`prefix_${message.guild.id}`);

  if (prefixes == null) {
    prefix = "skune";
  } else {
    prefix = prefixes;
  }

  if (message.content === "skuneprefix") {
    message.reply({
      embed: {
        color: "#679ad8",
        description: `\`\`\`Сервер дээрх командын угтвар тэмдэг <${prefix}> дээр тохируулагдсан байна.\`\`\``,
        footer: {
          text: "© 2021. 14K",
        },
      },
    });
  }

  if (prefix !== "skune") {
    if (message.content === "skunehelp") {
      message.reply({
        embed: {
          author: {
            name: "sku14k#1263 - Хөгжүүлэгч",
            icon_url: "https://i.imgur.com/0McUiDc.jpg",
          },
          color: "#679ad8",
          title: "Хэрэглэх заавар",
          description: `Намайг сонгон хэрэглэж байгаа танд баярлалаа`,
          fields: [
            {
              name: "Сервер удирдах",
              value: `\`\`\`${prefix}help server\`\`\``,
              inline: true,
            },
            {
              name: 'Дуу тоглуулах',
              value: `\`\`\`${prefix}help music\`\`\``,
              inline: true
            },
            {
              name: "Нэмэлт",
              value: `\`\`\`${prefix}help extra\`\`\``,
              inline: true,
            },
            {
              name: "Командын угтвар тэмдэг солих",
              value: `\`\`\`${prefix}setprefix [Шинэ Командын Угтвар Тэмдэг]\`\`\``,
              inline: false,
            },
          ],
          footer: {
            text: "© 2021. 14K",
          },
        },
      });
    }
  }
});

client.on("guildCreate", async (guild) => {
  let prefix;
  let prefixes = await db.fetch(`prefix_${guild.id}`);

  if (prefixes == null) {
    prefix = "skune";
  } else {
    prefix = prefixes;
  }

  var found = false;
  guild.channels.cache.forEach((channel) => {
    if (found == true || channel.type != "text") {
      return;
    }
    if (
      guild.me.permissionsIn(channel).has("SEND_MESSAGES") &&
      guild.me.permissionsIn(channel).has("VIEW_CHANNEL")
    ) {
      found = true;
      let embed = new Discord.MessageEmbed()
        .setTitle("skune амжилттай дискорд серверт нэгдлээ")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/0McUiDc.jpg"
        )
        .setDescription(
          "Намайг сонгон хэрэглэж байгаа танд баярлалаа"
        )
        .addFields(
          {
            name: "Хэрэглэх заавар",
            value: `\`\`\`Та <skunehelp> гэж бичсэнээр тусламж авах боломжтой\`\`\``,
          },
          {
            name: "Командын угтвар тэмдэг солих",
            value: `\`\`\`${prefix}setprefix [Шинэ Командын Угтвар Тэмдэг]\`\`\``,
          },
          {
            name: "Дэлгэрэнгүй",
            value: `\`\`\`Бусад дэлгэрэнгүй мэдээллийг https://skunebot.com/ -оос авна уу.\`\`\``,
          }
        )
        .setColor("#679ad8")
        .setFooter("© 2021. 14K");
      return channel.send(embed);
    }
  });
});

client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) return;

  var datestring = `${member.user.createdAt.getFullYear()} оны ${
    member.user.createdAt.getMonth() + 1
  }-р сарын ${member.user.createdAt.getDate()}-нд ${member.user.createdAt.getHours()} цаг ${member.user.createdAt.getMinutes()} минут`;
  let wembed = new Discord.MessageEmbed()
    .setColor("#679ad8")
    .addFields(
      {
        name: "ID",
        value: `\`\`\`${member.user.id}\`\`\``,
      },
      {
        name: "Гишүүний дискорд хаяг нээгдсэн огноо",
        value: `\`\`\`${datestring}\`\`\``,
      }
    )
    .setFooter("© 2021. 14K")
    .setAuthor(
      `Тавтай морил, ${member.user.username}`,
      client.user.displayAvatarURL()
    )
    .setThumbnail(member.user.displayAvatarURL());

  client.channels.cache.get(chx).send(wembed);
});

client.on("guildMemberRemove", (member) => {
  let chx = db.get(`leachannel_${member.guild.id}`);

  if (chx === null) return;

  var datestring = `${member.joinedAt.getFullYear()} оны ${
    member.joinedAt.getMonth() + 1
  }-р сарын ${member.joinedAt.getDate()}-нд ${member.joinedAt.getHours()} цаг ${member.joinedAt.getMinutes()} минут`;
  let wembed = new Discord.MessageEmbed()
    .setAuthor(
      `Баяртай, ${member.user.username}`,
      client.user.displayAvatarURL()
    )
    .setColor("#679ad8")
    .setThumbnail(member.user.displayAvatarURL())
    .addFields(
      {
        name: "ID",
        value: `\`\`\`${member.user.id}\`\`\``,
      },
      {
        name: "Гишүүний серверт нэгдсэн огноо",
        value: `\`\`\`${datestring}\`\`\``,
      },
      {
        name: "Гишүүний ажил үүрэгүүд",
        value: `\`\`\`${
          member.roles.cache.size - 1
            ? member.roles.cache
                .map((e) => e.name)
                .filter((x) => x !== "@everyone")
                .join(", ")
            : "Байхгүй"
        }\`\`\``,
      }
    )
    .setFooter("© 2021. 14K");

  client.channels.cache.get(chx).send(wembed);
});

client.on("message", async (message) => {
  if ((await rdb.has(`swear-${message.guild.id}`)) === false) return;

  for (let i = 0; i < words.length; i++) {
    if (message.content.includes(words[i])) {
      message.delete();
      message
        .reply({
          embed: {
            color: "#00FF00",
            title: "Анхааруулга :exclamation:",
            description: `\`\`\`Энэ үгийг сервер дээр ашиглахыг хориглоно!\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 3000 }));
    }
  }
});

client.login(config.token);
