const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return message.channel.send({
        embed: {
          color: "#679ad8",
          description: `Давталт **\`${
            serverQueue.loop === true ? "идэвхижлээ" : "унтарлаа"
          }\`**`,
          footer: {
            text: "© 2022 14K",
          },
        },
      });
    }
    return message
      .reply({
        embed: {
          color: "#679ad8",
          description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул команд ажиллаж чадсангүй.\`\`\``,
          footer: {
            text: "© 2022 14K",
          },
        },
      })
      .then((m) => m.delete({ timeout: 15000 }))
      .then(message.delete({ timeout: 15000 }));
  },
};
