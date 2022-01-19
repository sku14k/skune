const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  async execute(message, args) {
    if (!args[0])
    return message
      .reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`${prefix}8ball [Асуулт]\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 60000 }))
      .then(message.delete({ timeout: 60000 }));

      let replies = ["Тийнн гөхшөө", "Мэдкүэээ бро", "Яахымбээ андаа", "Тэг тэг тэг", "Бро миндээ...", "Дэмий дэмий", "Үгүй-тийм", "Тийм-үгүй", "Мань мэдкүээ"];

      let result = Math.floor((Math.random() * replies.length));

      let question = args.slice().join(" ");

      let ballembed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setFooter("© 2022 14K")
        .setDescription(`\`\`\`${replies[result]}\`\`\``);
    message.channel.send(ballembed)
  },
};
