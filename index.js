const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const rdb = require("./reconDB");
const words = require("./as.json");

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
        title: "Комманд ажиллуулах зөвлөгөө :woman_tipping_hand:",
        color: "#FFFF00",
        description: `\`\`\`Таны бичсэн комманд үсгийн алдаатай эсвэл олдоогүй тул та ${prefix}help гэж бичсэнээр тусламж авах боломжтой.\`\`\``,
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
        title: "Комманд ажиллуулах явцад гэнэтийн алдаа гарлаа :x:",
        color: "#FF0000",
        description: `\`\`\`Та комманд тэмдэгээ буруу бичсэн эсвэл тухайн ажиллуулах гэсэн комманд байгаагүй тул гэнэтийн алдаа гарлаа`,
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
        title: "Комманд амжилттай ажиллаа :white_check_mark:",
        color: "#679ad8",
        description: `\`\`\`Сервер дээрх комманд тэмдэг ${prefix} дээр тохируулагдсан байна.\`\`\``,
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
            icon_url: "https://i.imgur.com/asbpULZ.jpg",
          },
          color: "#679ad8",
          title: "Ашиглах заавар :book:",
          description: `Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:`,
          fields: [
            {
              name: "Сервер удирдах",
              value: `\`\`\`${prefix}help server\`\`\``,
              inline: true,
            },
            // {
            //   name: 'Дуу тоглуулах',
            //   value: `\`\`\`${prefix}help music\`\`\``,
            //   inline: true
            // },
            {
              name: "Нэмэлт",
              value: `\`\`\`${prefix}help extra\`\`\``,
              inline: true,
            },
            {
              name: "Комманд тэмдэг солих",
              value: `\`\`\`${prefix}setprefix [Комманд Тэмдэг]\`\`\``,
              inline: false,
            },
          ],
          footer: {
            text: "© 2021. 14K",
          },
        },
      });

      if (message.content === `${prefix}help server`) {
        const pageone = new Discord.MessageEmbed()
          .setColor("#679ad8")
          .setAuthor(
            "sku14k#1263 - Хөгжүүлэгч",
            "https://i.imgur.com/asbpULZ.jpg"
          )
          .setTitle("Сервер удирдах коммандууд :keyboard:")
          .setDescription(
            "Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:"
          )
          .setFooter("© 2021. 14K")
          .addFields(
            {
              name: "Гишүүнд серверээс хориг тавих",
              value: `\`\`\`${prefix}ban [Гишүүн] [Шалтгаан]\`\`\``,
            },
            {
              name: "Гишүүнд серверээс тавьсан хоригийг цуцлах",
              value: `\`\`\`${prefix}unban [Гишүүн] [Шалтгаан]\`\`\``,
            },
            {
              name: "Гишүүнийг серверээс гаргах",
              value: `\`\`\`${prefix}kick [Гишүүн] [Шалтгаан]\`\`\``,
            },
            {
              name: "Гишүүнийг чимээгүй болгох",
              value: `\`\`\`${prefix}mute [Гишүүн]\`\`\``,
            },
            {
              name: "Гишүүнийг чимээтэй болгох",
              value: `\`\`\`${prefix}unmute [Гишүүн]\`\`\``,
            },
            {
              name: "Гишүүнийг түр чимээгүй болгох",
              value: `\`\`\`${prefix}tempmute [Гишүүн] [Хугацаа]\`\`\``,
            },
            {
              name: "Гишүүнд эсвэл өөртөө хоч өгөх",
              value: `\`\`\`${prefix}setnick [Гишүүн] [Хоч] эсвэл ${prefix}setnick [Хоч]\`\`\``,
            }
          );

        const pagetwo = new Discord.MessageEmbed()
          .setColor("#679ad8")
          .setAuthor(
            "sku14k#1263 - Хөгжүүлэгч",
            "https://i.imgur.com/asbpULZ.jpg"
          )
          .setTitle("Сервер удирдах коммандууд :keyboard:")
          .setDescription(
            "Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:"
          )
          .setFooter("© 2021. 14K")
          .addFields(
            {
              name: "Серверийн мэдээллийг харах",
              value: `\`\`\`${prefix}serverinfo\`\`\``,
            },
            {
              name:
                "Гишүүний мэдээллийг эсвэл өөрийн мэдээллийг серверээс харах",
              value: `\`\`\`${prefix}userinfo [Гишүүн] эсвэл ${prefix}userinfo\`\`\``,
            },
            {
              name: "Серверийн шинэ гишүүн угтаж авах текст сувгийг өөрчлөх",
              value: `\`\`\`${prefix}setwelcome [Текст Суваг]\`\`\``,
            },
            {
              name: "Серверийн гишүүн үдэж явуулах текст сувгийг өөрчлөх",
              value: `\`\`\`${prefix}setleave [Текст Суваг]\`\`\``,
            },
            {
              name: "Серверийн текст сувагт ботоор мессеж бичүүлэх",
              value: `\`\`\`${prefix}say [Мессеж] эсвэл ${prefix}say embed [Мессеж]\`\`\``,
            },
            {
              name: "Серверийн текст сувагаас мөр мессеж устгах",
              value: `\`\`\`${prefix}clear [Мөр Мессежийн Хэмжээ]\`\`\``,
            },
            {
              name: "Комманд тэмдэг солих",
              value: `\`\`\`${prefix}setprefix [Комманд Тэмдэг]\`\`\``,
            }
          );

        const pages = [pageone, pagetwo];

        const emojiList = ["↩", "↪"];

        pagination(message, pages, emojiList);
      }
      // if(message.contet === `${prefix}help music`) {
      //   const pageone = new Discord.MessageEmbed()
      //   .setColor('#679ad8')
      //   .setAuthor("sku14k#1263 - Хөгжүүлэгч", "https://i.imgur.com/asbpULZ.jpg")
      //   .setTitle('Дууны коммандууд 🎵')
      //   .setDescription("Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:")
      //   .setFooter("© 2021. 14K")
      //   .addFields(
      //     {
      //       name: 'Дуу тоглуулах',
      //       value: `\`\`\`${prefix}play\`\`\``,
      //     },
      //     {
      //       name: 'Дуу зогсоох',
      //       value: `\`\`\`${prefix}stop\`\`\``,
      //     },
      //     {
      //       name: 'Дуу түр зогсоох',
      //       value: `\`\`\`${prefix}pause\`\`\``,
      //     },
      //     {
      //       name: 'Дуу үргэлжлүүлэх',
      //       value: `\`\`\`${prefix}resume\`\`\``,
      //     },
      //     {
      //       name: 'Дуу давтуулах',
      //       value: `\`\`\`${prefix}loop\`\`\``,
      //     },
      //     {
      //       name: 'Дараалалд байгаа дуунуудыг давтуулах',
      //       value: `\`\`\`${prefix}shuffle\`\`\``,
      //     },
      //     {
      //       name: 'Одоо тоглож байгаа дууг харах',
      //       value: `\`\`\`${prefix}np\`\`\``,
      //     },
      //     {
      //       name: 'Дуу тоглуулагчийн дууны түвшинг өөрчлөх',
      //       value: `\`\`\`${prefix}volume [Дууны Түвшин]\`\`\``
      //     },
      //   )

      //   const pagetwo = new Discord.MessageEmbed()
      //       .setColor('#679ad8')
      //       .setAuthor("sku14k#1263 - Хөгжүүлэгч", "https://i.imgur.com/asbpULZ.jpg")
      //       .setTitle('Дууны коммандууд 🎵')
      //       .setDescription("Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:")
      //       .setFooter("© 2021. 14K")
      //       .addFields(
      //         {
      //           name: 'АФК болох',
      //           value: `\`\`\`${prefix}afk\`\`\``,
      //         },
      //         {
      //           name: 'Одоо тоглож байгаа дууны үг харах',
      //           value: `\`\`\`${prefix}lyrics\`\`\``,
      //         },
      //         {
      //           name: 'Дараалалд байгаа дуунуудыг харах',
      //           value: `\`\`\`${prefix}queue\`\`\``,
      //         },
      //         {
      //           name: 'Дарааллаас дуу хасах',
      //           value: `\`\`\`${prefix}remove [Дууны Дугаар]\`\`\``,
      //         },
      //         {
      //           name: 'Тоглуулах жагсаалт тоглуулах',
      //           value: `\`\`\`${prefix}playlist [Тоглуулах Жагсаалтын Холбоос Эсвэл Нэр]\`\`\``,
      //         },
      //         {
      //           name: 'Дуу хайх',
      //           value: `\`\`\`${prefix}search [Дууны Нэр]\`\`\``,
      //         },
      //         {
      //           name: 'Дуу алгасах',
      //           value: `\`\`\`${prefix}skip\`\`\``,
      //         },
      //         {
      //           name: 'Дараалалд байгаа дуунуудаас сонгосон дуу хүртэл өмнөх дуунуудыг алгасах',
      //           value: `\`\`\`${prefix}skipto [Дараалалд Байгаа Дууны Дугаар]\`\`\``
      //         },
      //       )

      //       const pages = [
      //         pageone,
      //         pagetwo
      //       ]

      //       const emojiList = ["↩", "↪"];

      //       pagination(message, pages, emojiList)
      // }
      if (message.content === `${prefix}help extra`) {
        const pageone = new Discord.MessageEmbed()
          .setColor("#679ad8")
          .setAuthor(
            "sku14k#1263 - Хөгжүүлэгч",
            "https://i.imgur.com/asbpULZ.jpg"
          )
          .setTitle("Нэмэлт коммандууд ➕")
          .setDescription(
            "Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:"
          )
          .setFooter("© 2021. 14K")
          .addFields(
            {
              name: "Өөрийн эсвэл гишүүний хөрөг зургийг харах",
              value: `\`\`\`${prefix}avatar эсвэл ${prefix}avatar [Гишүүн]\`\`\``,
            },
            {
              name: "Коронавирусийн тухай мэдээлэл авах",
              value: `\`\`\`${prefix}corona эсвэл ${prefix}corona [Улсын Нэр]\`\`\``,
            },
            {
              name: "Цаг агаарын тухай мэдээлэл авах",
              value: `\`\`\`${prefix}weather [Хотын Нэр]\`\`\``,
            }
          );
        message.reply(pageone);
      }
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
        .setTitle("skune бот амжилттай серверт нэгдлээ :wave:")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/asbpULZ.jpg"
        )
        .setDescription(
          "skune бот-ыг сонгон ашиглаж байгаа танд маш их баярлалаа :hugging: "
        )
        .addFields(
          {
            name: "Ашиглах заавар",
            value: "Та `skunehelp` гэж бичсэнээр тусламж авах боломжтой.",
          },
          {
            name: "Комманд тэмдэг солих заавар",
            value: `\`${prefix}setprefix [Шинэ Комманд Тэмдэг]\` гэж бичсэнээр комманд тэмдэг солигдоно.`,
          },
          {
            name: "Дэлгэрэнгүй",
            value:
              "Бусад дэлгэрэнгүй мэдээллийг https://skunebot.com/ -оос авна уу.",
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

client.login(process.env.token);
