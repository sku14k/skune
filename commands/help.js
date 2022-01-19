const Discord = require("discord.js");
const db = require("quick.db");
const pagination = require("discord.js-pagination");

module.exports = {
  name: "help",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!args[0])
      return message.reply({
        embed: {
          color: "#679ad8",
          title: "Ашиглах заавар",
          description: `[black14k.tk](https://black14k.tk)`,
          fields: [
            {
              name: "Сервер удирдах",
              value: `\`\`\`${prefix}help server\`\`\``,
              inline: true,
            },
            // {
            //   name: "Дуу тоглуулах",
            //   value: `\`\`\`${prefix}help music\`\`\``,
            //   inline: true,
            // },
            {
              name: "Нэмэлт",
              value: `\`\`\`${prefix}help extra\`\`\``,
              inline: true,
            },
            {
              name: "Командын угтвар тэмдэг солих",
              value: `\`\`\`${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``,
              inline: false,
            },
          ],
          footer: {
            text: "© 2022 14K",
          },
        },
      });

    if (args[0].toLowerCase() === "server") {
      const pageone = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setTitle("Сервер удирдах командууд")
        .setDescription(`[black14k.tk](https://black14k.tk)`)
        .setFooter("© 2022 14K")
        .addFields(
          {
            name: "Хэрэглэгчд серверээс хориг тавих",
            value: `\`\`\`${prefix}ban [@Хэрэглэгч] [Шалтгаан]\`\`\``,
          },
          {
            name: "Хэрэглэгчд серверээс тавьсан хоригийг цуцлах",
            value: `\`\`\`${prefix}unban [@Хэрэглэгч] [Шалтгаан]\`\`\``,
          },
          {
            name: "Хэрэглэгчийг серверээс гаргах",
            value: `\`\`\`${prefix}kick [@Хэрэглэгч] [Шалтгаан]\`\`\``,
          },
          {
            name: "Хэрэглэгчийн чат бичих эрхийг хураах",
            value: `\`\`\`${prefix}mute [@Хэрэглэгч]\`\`\``,
          },
          {
            name: "Хэрэглэгчд чат бичих эрх олгох",
            value: `\`\`\`${prefix}unmute [@Хэрэглэгч]\`\`\``,
          }
        );

      const pagetwo = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setTitle("Сервер удирдах командууд")
        .setDescription(`[black14k.tk](https://black14k.tk)`)
        .setFooter("© 2022 14K")
        .addFields(
          {
            name: "Хэрэглэгчийн чат бичих эрхийг түр хураах",
            value: `\`\`\`${prefix}tempmute [@Хэрэглэгч] [Хугацаа | 1m = 1 минут, 30s = 30 секунд]\`\`\``,
          },
          {
            name: "Хэрэлэгчд эсвэл өөртөө хоч өгөх",
            value: `\`\`\`${prefix}setnick [@Хэрэглэгч] [Хоч] эсвэл ${prefix}setnick [Хоч]\`\`\``,
          },
          {
            name: "Серверийн шинэ хэрэглэгч угтаж авах текст сувгийг өөрчлөх",
            value: `\`\`\`${prefix}setwelcome [Текст Суваг]\`\`\``,
          },
          {
            name: "Серверийн хэрэглэгч үдэж явуулах текст сувгийг өөрчлөх",
            value: `\`\`\`${prefix}setleave [Текст Суваг]\`\`\``,
          },
          {
            name: "Комадын угтвар тэмдэг солих",
            value: `\`\`\`${prefix}setprefix [Командын Угтвар  Тэмдэг]\`\`\``,
          }
        );

      const pages = [pageone, pagetwo];

      const emojiList = ["↩", "↪"];

      pagination(message, pages, emojiList);
    }
    // if (args[0].toLowerCase() === "music") {
    //   const pageone = new Discord.MessageEmbed()
    //     .setColor("#679ad8")
    //     .setTitle("Дууны командууд")
    //     .setDescription(
    //       `[black14k.tk](https://black14k.tk)`
    //     )
    //     .setFooter("© 2022 14K")
    //     .addFields(
    //       {
    //         name: "Дуу тоглуулах",
    //         value: `\`\`\`${prefix}play\`\`\``,
    //       },
    //       {
    //         name: "Дуу зогсоох",
    //         value: `\`\`\`${prefix}stop\`\`\``,
    //       },
    //       {
    //         name: "Дуу түр зогсоох",
    //         value: `\`\`\`${prefix}pause\`\`\``,
    //       },
    //       {
    //         name: "Дуу үргэлжлүүлэх",
    //         value: `\`\`\`${prefix}resume\`\`\``,
    //       },
    //       {
    //         name: "Дуу давтуулах",
    //         value: `\`\`\`${prefix}loop\`\`\``,
    //       },
    //       {
    //         name: "Дараалалд байгаа дуунуудыг давтуулах",
    //         value: `\`\`\`${prefix}shuffle\`\`\``,
    //       },
    //       {
    //         name: "Одоо тоглож байгаа дууг харах",
    //         value: `\`\`\`${prefix}np\`\`\``,
    //       },
    //       {
    //         name: "Дуу тоглуулагчийн дууны түвшинг өөрчлөх",
    //         value: `\`\`\`${prefix}volume [Дууны Түвшин]\`\`\``,
    //       }
    //     );

    //   const pagetwo = new Discord.MessageEmbed()
    //     .setColor("#679ad8")
    //     .setTitle("Дууны командууд")
    //     .setDescription(
    //       `[black14k.tk](https://black14k.tk)`
    //     )
    //     .setFooter("© 2022 14K")
    //     .addFields(
    //       {
    //         name: "АФК болох",
    //         value: `\`\`\`${prefix}afk\`\`\``,
    //       },
    //       {
    //         name: "Одоо тоглож байгаа дууны үг харах",
    //         value: `\`\`\`${prefix}lyrics\`\`\``,
    //       },
    //       {
    //         name: "Дараалалд байгаа дуунуудыг харах",
    //         value: `\`\`\`${prefix}queue\`\`\``,
    //       },
    //       {
    //         name: "Дарааллаас дуу хасах",
    //         value: `\`\`\`${prefix}remove [Дууны Дугаар]\`\`\``,
    //       },
    //       {
    //         name: "Тоглуулах жагсаалт тоглуулах",
    //         value: `\`\`\`${prefix}playlist [Тоглуулах Жагсаалтын Холбоос Эсвэл Нэр]\`\`\``,
    //       },
    //       {
    //         name: "Дуу хайх",
    //         value: `\`\`\`${prefix}search [Дууны Нэр]\`\`\``,
    //       },
    //       {
    //         name: "Дуу алгасах",
    //         value: `\`\`\`${prefix}skip\`\`\``,
    //       },
    //       {
    //         name:
    //           "Дараалалд байгаа дуунуудаас сонгосон дуу хүртэл өмнөх дуунуудыг алгасах",
    //         value: `\`\`\`${prefix}skipto [Дараалалд Байгаа Дууны Дугаар]\`\`\``,
    //       }
    //     );

    //   const pages = [pageone, pagetwo];

    //   const emojiList = ["↩", "↪"];

    //   pagination(message, pages, emojiList);
    // }
    if (args[0].toLowerCase() === "extra") {
      const pageone = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setTitle("Нэмэлт командууд")
        .setDescription(`[black14k.tk](https://black14k.tk)`)
        .setFooter("© 2022 14K")
        .addFields(
          {
            name: "Өөрийн эсвэл хэрэглэгчийн хөрөг зургийг харах",
            value: `\`\`\`${prefix}avatar эсвэл ${prefix}avatar [@Хэрэглэгч]\`\`\``,
          },
          {
            name: "Коронавирусийн тухай мэдээлэл авах",
            value: `\`\`\`${prefix}corona эсвэл ${prefix}corona [Улсын Нэр]\`\`\``,
          },
          {
            name: "Цаг агаарын тухай мэдээлэл авах",
            value: `\`\`\`${prefix}weather [Хотын Нэр]\`\`\``,
          },
          {
            name: "Серверийн мэдээллийг харах",
            value: `\`\`\`${prefix}serverinfo\`\`\``,
          }
        );

      const pagetwo = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setTitle("Нэмэлт командууд")
        .setDescription(`[black14k.tk](https://black14k.tk)`)
        .setFooter("© 2022 14K")
        .addFields(
          {
            name: "хэрэглэгчийн мэдээллийг эсвэл өөрийн мэдээллийг серверээс харах",
            value: `\`\`\`${prefix}userinfo [@Хэрэглэгч] эсвэл ${prefix}userinfo\`\`\``,
          },
          {
            name: "Текст сувагт ботоор мессеж бичүүлэх",
            value: `\`\`\`${prefix}say [Мессеж] эсвэл ${prefix}say embed [Мессеж]\`\`\``,
          },
	  {
            name: "Текст сувагт ботоор эможи мессеж бичүүлэх",
            value: `\`\`\`${prefix}emojify [Мессеж]\`\`\``,
          },
          {
            name: "Серверийн текст сувагаас мөр мессеж устгах",
            value: `\`\`\`${prefix}clear [Мөр Мессежийн Хэмжээ]\`\`\``,
          },
        );

      const pages = [pageone, pagetwo];

      const emojiList = ["↩", "↪"];

      pagination(message, pages, emojiList);
    }
  },
};
