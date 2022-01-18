const Discord = require("discord.js");

module.exports = {
  name: "coinflip",
  async execute(message, args) {
    var choices = ["тоо", "сүлд"];

    var output = choices[Math.floor(Math.random() * choices.length)];

    if (output == "тоо") {
      message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${message.author.tag} та тоо буулгалаа\`\`\``,
            image: {
              url: "https://imgur.com/eo773Jv.png",
            },
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 30000 }))
        .then(message.delete({ timeout: 30000 }));
    }
    if (output == "сүлд") {
      message
        .reply({
          embed: {
            color: "#679ad8",
            description: `\`\`\`${message.author.tag} та сүлд буулгалаа\`\`\``,
            image: {
              url: "https://i.imgur.com/ybuX7F8.png",
            },
            footer: {
              text: "© 2022 14K",
            },
          },
        })
        .then((m) => m.delete({ timeout: 30000 }))
        .then(message.delete({ timeout: 30000 }));
    }
  },
};
