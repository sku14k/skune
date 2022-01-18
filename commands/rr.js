const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rr",
  async execute(message, args) {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "skune";
    } else {
      prefix = prefixes;
    }

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return;
    if (!message.guild.me.hasPermission("MANAGE_MEMBERS")) return;

    const user = message.mentions.members.first();

    if (!user)
      return message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${prefix}rr [@Хэрэглэгч] [Ажил Үүрэг]\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 60000 }))
        .then(message.delete({ timeout: 60000 }));

    const role = message.guild.roles.cache.find(
      (r) => r.name === args.slice(1).join(" ")
    );

    if (!role) return;
    //  message
    //     .reply({
    //       embed: {
    //         color: "#FFFF00",
    //         title: "Комманд ажиллуулах зөвлөмж :woman_tipping_hand:",
    //         description: `\`\`\`Энэ комманд нь тухайн гишүүнд олгосон ажил үүргийг хураах үүрэгтэй.\`\`\``,
    //         fields: [
    //           {
    //             name: "Зөвлөмж",
    //             value: `\`\`\`${prefix}rr [Гишүүн] [Ажил Үүрэг] гэж бичсэнээр гишүүнээс ажил үүргийг хураана.\`\`\``,
    //           },
    //         ],
    //         footer: {
    //           text: "© 2021. 14K",
    //         },
    //       },
    //     })
    //     .then((m) => m.delete({ timeout: 60000 }))
    //     .then(message.delete({ timeout: 60000 }));

    // if(user.roles.cache.has(role.id)) return message.reply({
    //     embed: {
    //         color: "#FF0000",
    //         title: 'Алдаа гарлаа :x:',
    //         description: `\`\`\`Гишүүнд аль хэдийнээ ${role.name} гэсэн ажил үүрэг олгосон байна.\`\`\``,
    //         footer: {
    //             text: "© 2021. 14K"
    //         }
    //     }
    // }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

    await user.roles.remove(role.id),
      message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${user.user.tag} хэрэглэгчээс амжилттай ${role.name} ажил үүргийг хураалаа.\`\`\``,
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 15000 }))
        .then(message.delete({ timeout: 15000 }));
  },
};
