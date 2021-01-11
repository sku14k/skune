const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Энэ комманд нь серверийн мэдээлэлийг харуулдаг.",
  execute(message, args) {
    const { guild } = message;

    let rolemap = [];
    guild.roles.cache.each((role) => {
      rolemap.push(role.name);
    });

    const { name, region, memberCount, owner } = guild;
    const icon = guild.iconURL();
    let [month, date, year] = message.guild.createdAt
      .toLocaleDateString("en-US")
      .split("/");

    const verificationLevels = {
      NONE: "Энгийн",
      LOW: "Бага",
      MEDIUM: "Дунд",
      HIGH: "Өндөр",
      VERY_HIGH: "Маш өндөр",
    };

    const embed = new Discord.MessageEmbed()
      .setTitle(`Серверийн мэдээлэл :information_source:`)
      .setThumbnail(icon)
      .setColor("#679ad8")
      .addFields(
        {
          name: "Серверийн нэр",
          value: `\`\`\`${name}\`\`\``,
          inline: false,
        },
        {
          name: "Сервер эзэмшигч",
          value: `\`\`\`${guild.owner.user.tag}\`\`\``,
          inline: true,
        },
        {
          name: "Сервер АИДИ",
          value: `\`\`\`${guild.id}\`\`\``,
          inline: true,
        },
        {
          name: "Сервер нээгдсэн огноо",
          value: `\`\`\`${year} оны ${month}-р сарын ${date}\`\`\``,
          inline: false,
        },
        {
          name: "Бүс",
          value: `\`\`\`${region}\`\`\``,
          inline: true,
        },
        {
          name: "Нийт гишүүд",
          value: `\`\`\`${memberCount}\`\`\``,
          inline: true,
        },
        {
          name: "Сүлжээнд одоо идэвхтэй байгаа гишүүд",
          value: `\`\`\`${
            message.guild.members.cache.filter(
              (m) => m.user.presence.status == "online"
            ).size
          }\`\`\``,
          inline: false,
        },
        {
          name: "Нийт ангилал",
          value: `\`\`\`${
            message.guild.channels.cache.filter((c) => c.type === "category")
              .size
          }\`\`\``,
          inline: true,
        },
        {
          name: "Нийт ажил үүрэг",
          value: `\`\`\`${message.guild.roles.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: "Нийт текст суваг",
          value: `\`\`\`${
            message.guild.channels.cache.filter((c) => c.type === "text").size
          }\`\`\``,
          inline: false,
        },
        {
          name: "Нийт дуут суваг",
          value: `\`\`\`${
            message.guild.channels.cache.filter((c) => c.type === "voice").size
          }\`\`\``,
          inline: true,
        },
        {
          name: "Нийт эможи",
          value: `\`\`\`${message.guild.emojis.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: "Ажил үүрэгүүд",
          value: `\`\`\`${rolemap
            .filter((x) => x !== "@everyone")
            .join(", ")}\`\`\``,
          inline: false,
        },
        {
          name: "Нийт сервер өсгөгч",
          value: `\`\`\`${message.guild.premiumSubscriptionCount}\`\`\``,
          inline: true,
        },
        {
          name: "Сервер баталгаажуулалт",
          value: `\`\`\`${
            message.guild.verified
              ? `Баталгаажуулагдсан`
              : `Баталгаажуулагдаагүй`
          }\`\`\``,
          inline: true,
        },
        {
          name: "Сервер тохируулгийн түвшин",
          value: `\`\`\`${
            verificationLevels[message.guild.verificationLevel]
          }\`\`\``,
          inline: false,
        }
      );

    message.channel.send(embed);
  },
};
