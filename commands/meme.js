const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
  name: "meme",
  async execute(message, args) {
      const subReddits = ["meme", "memes"];
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];

      const img = await randomPuppy(random);

      const embed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .setImage(img)
        .setFooter("© 2022 14K")
  },
};
