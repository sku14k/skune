const Discord = require("discord.js");
const db = require("quick.db");
const pagination = require("discord.js-pagination");

module.exports = {
  name: "help",
  description: "Энэ комманд нь ботоор мессеж бичүүлэх үүрэгтэй.",
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

    if (args[0].toLowerCase() === "server") {
      const pageone = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/0McUiDc.jpg"
        )
        .setTitle("Сервер удирдах командууд")
        .setDescription(
          "Намайг сонгон хэрэглэж байгаа танд баярлалаа"
        )
        .setFooter("© 2021. 14K")
        .addFields(
          {
            name: "Гишүүнд серверээс хориг тавих",
            value: `\`\`\`${prefix}ban [@Гишүүн] [Шалтгаан]\`\`\``,
          },
          {
            name: "Гишүүнд серверээс тавьсан хоригийг цуцлах",
            value: `\`\`\`${prefix}unban [@Гишүүн] [Шалтгаан]\`\`\``,
          },
          {
            name: "Гишүүнийг серверээс гаргах",
            value: `\`\`\`${prefix}kick [@Гишүүн] [Шалтгаан]\`\`\``,
          },
          {
            name: "Гишүүнийг чимээгүй болгох",
            value: `\`\`\`${prefix}mute [@Гишүүн]\`\`\``,
          },
          {
            name: "Гишүүнийг чимээтэй болгох",
            value: `\`\`\`${prefix}unmute [@Гишүүн]\`\`\``,
          },
        );

      const pagetwo = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/0McUiDc.jpg"
        )
        .setTitle("Сервер удирдах командууд")
        .setDescription(
          "Намайг сонгон хэрэглэж байгаа танд баярлалаа"
        )
        .setFooter("© 2021. 14K")
        .addFields(
          {
            name: "Гишүүнийг түр чимээгүй болгох",
            value: `\`\`\`${prefix}tempmute [@Гишүүн] [Хугацаа]\`\`\``,
          },
          {
            name: "Гишүүнд эсвэл өөртөө хоч өгөх",
            value: `\`\`\`${prefix}setnick [@Гишүүн] [Хоч] эсвэл ${prefix}setnick [Хоч]\`\`\``,
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
            name: "Комманд тэмдэг солих",
            value: `\`\`\`${prefix}setprefix [Комманд Тэмдэг]\`\`\``,
          }
        );

      const pages = [pageone, pagetwo];

      const emojiList = ["↩", "↪"];

      pagination(message, pages, emojiList);
    }
    if(args[0].toLowerCase() === "music") {
      const pageone = new Discord.MessageEmbed()
      .setColor('#679ad8')
      .setAuthor("sku14k#1263 - Хөгжүүлэгч", "https://i.imgur.com/asbpULZ.jpg")
      .setTitle('Дууны коммандууд 🎵')
      .setDescription("Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:")
      .setFooter("© 2021. 14K")
      .addFields(
        {
          name: 'Дуу тоглуулах',
          value: `\`\`\`${prefix}play\`\`\``,
        },
        {
          name: 'Дуу зогсоох',
          value: `\`\`\`${prefix}stop\`\`\``,
        },
        {
          name: 'Дуу түр зогсоох',
          value: `\`\`\`${prefix}pause\`\`\``,
        },
        {
          name: 'Дуу үргэлжлүүлэх',
          value: `\`\`\`${prefix}resume\`\`\``,
        },
        {
          name: 'Дуу давтуулах',
          value: `\`\`\`${prefix}loop\`\`\``,
        },
        {
          name: 'Дараалалд байгаа дуунуудыг давтуулах',
          value: `\`\`\`${prefix}shuffle\`\`\``,
        },
        {
          name: 'Одоо тоглож байгаа дууг харах',
          value: `\`\`\`${prefix}np\`\`\``,
        },
        {
          name: 'Дуу тоглуулагчийн дууны түвшинг өөрчлөх',
          value: `\`\`\`${prefix}volume [Дууны Түвшин]\`\`\``
        },
      )

      const pagetwo = new Discord.MessageEmbed()
          .setColor('#679ad8')
          .setAuthor("sku14k#1263 - Хөгжүүлэгч", "https://i.imgur.com/asbpULZ.jpg")
          .setTitle('Дууны коммандууд 🎵')
          .setDescription("Намайг сонгон хэрэглэж байгаа танд баярлалаа :hugging:")
          .setFooter("© 2021. 14K")
          .addFields(
            {
              name: 'АФК болох',
              value: `\`\`\`${prefix}afk\`\`\``,
            },
            {
              name: 'Одоо тоглож байгаа дууны үг харах',
              value: `\`\`\`${prefix}lyrics\`\`\``,
            },
            {
              name: 'Дараалалд байгаа дуунуудыг харах',
              value: `\`\`\`${prefix}queue\`\`\``,
            },
            {
              name: 'Дарааллаас дуу хасах',
              value: `\`\`\`${prefix}remove [Дууны Дугаар]\`\`\``,
            },
            {
              name: 'Тоглуулах жагсаалт тоглуулах',
              value: `\`\`\`${prefix}playlist [Тоглуулах Жагсаалтын Холбоос Эсвэл Нэр]\`\`\``,
            },
            {
              name: 'Дуу хайх',
              value: `\`\`\`${prefix}search [Дууны Нэр]\`\`\``,
            },
            {
              name: 'Дуу алгасах',
              value: `\`\`\`${prefix}skip\`\`\``,
            },
            {
              name: 'Дараалалд байгаа дуунуудаас сонгосон дуу хүртэл өмнөх дуунуудыг алгасах',
              value: `\`\`\`${prefix}skipto [Дараалалд Байгаа Дууны Дугаар]\`\`\``
            },
          )

          const pages = [
            pageone,
            pagetwo
          ]

          const emojiList = ["↩", "↪"];

          pagination(message, pages, emojiList)
    }
    if (args[0].toLowerCase() === "extra") {
      const pageone = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/0McUiDc.jpg"
        )
        .setTitle("Нэмэлт командууд")
        .setDescription(
          "Намайг сонгон хэрэглэж байгаа танд баярлалаа"
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
          },
          {
            name: "Серверийн мэдээллийг харах",
            value: `\`\`\`${prefix}serverinfo\`\`\``,
          },
        );

        const pagetwo = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setAuthor(
          "sku14k#1263 - Хөгжүүлэгч",
          "https://i.imgur.com/0McUiDc.jpg"
        )
        .setTitle("Нэмэлт командууд")
        .setDescription(
          "Намайг сонгон хэрэглэж байгаа танд баярлалаа"
        )
        .setFooter("© 2021. 14K")
        .addFields(
          {
            name: "Гишүүний мэдээллийг эсвэл өөрийн мэдээллийг серверээс харах",
            value: `\`\`\`${prefix}userinfo [Гишүүн] эсвэл ${prefix}userinfo\`\`\``,
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
            name: "Хайч, чулуу, даавуу тоглох",
            value: `\`\`\`${prefix}rps\`\`\``,
          },
        );

        const pages = [pageone, pagetwo];

      const emojiList = ["↩", "↪"];

      pagination(message, pages, emojiList);
    }
  },
};
