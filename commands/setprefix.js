const db = require("quick.db");

module.exports = {
  name: "setprefix",
  description: "Энэ комманд нь ботын комманд тэмдэгийг өөрчилдөг.",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message
        .reply({
          embed: {
            color: "#FF0000",
            title: "Алдаа гарлаа :x:",
            description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
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
            title: "Комманд ажиллуулах зөвлөгөө :woman_tipping_hand:",
            description: `\`\`\`Энэ комманд нь ботын комманд тэмдэгийг өөрчлөх үүрэгтэй.\`\`\``,
            fields: [
              {
                name: "Зөвлөгөө",
                value: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}setprefix [Комманд тэмдэг] гэж бичсэнээр ботын комманд тэмдэг өөрчлөгдөнө.\`\`\``,
              },
            ],
            footer: {
              text: "© 2021. 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    await db.set(`prefix_${message.guild.id}`, args[0]);

    message
      .reply({
        embed: {
          color: "#679ad8",
          title: "Комманд амжилттай ажиллаа :white_check_mark:",
          description: `\`\`\`Комманд тэмдэг амжилттай ${args[0]} болж өөрчлөгдлөө.\`\`\``,
          footer: {
            text: "© 2021. 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
