const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "clear",
  description: "Энэ комманд нь мессежийн мөрийн хэмжээг устгадаг.",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (!args[0])
      return message
        .reply({
          embed: {
            color: "#FFFF00",
            title: "Комманд ажиллуулах зөвлөмж :woman_tipping_hand:",
            description: `\`\`\`Энэ комманд нь тухайн серверийн текст сувагаас мөр мессеж устгах үүрэгтэй.\`\`\``,
            fields: [
              {
                name: "Зөвлөмж",
                value: `\`\`\`${prefix}clear [Устгах Мөр Мессежийн Хэмжээ] гэж бичсэнээр серверийн текст сувагт байгаа мөр мессеж устгагдана.\`\`\``,
              },
            ],
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    if (isNaN(args[0]))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Устгах мессежийн мөрийн хэмжээ бодит тоо байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (args[0] > 100)
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Устгах мессежийн мөрийн хэмжээ зуугаас их байсан тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    if (args[0] < 1)
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Устгах мессежийн мөрийн хэмжээ нэгээс бага байсан тул комманд ажиллаж чадсангүй.\`\`\``,
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));

    await message.channel.messages
      .fetch({ limit: args[1] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
        message
          .reply({
            embed: {
              color: "#679ad8",
              title: "Комманд амжилттай ажиллаа :white_check_mark:",
              description: `\`\`\`${
                messages.size - 1
              } мөр мессеж амжилттай усгадлаа.\`\`\``,
              footer: {
                text: "© 2021. 14K",
              },
            },
          })
          .then((m) => m.delete({ timeout: 15000 }));
      });
  },
};
