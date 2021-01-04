const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Энэ комманд нь дуугаа давтуулахад ашигладаг.",
  

  async execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "#679ad8",
                    description: `🔁 Давталт **\`${serverQueue.loop === true ? "идэвхижлээ" : "унтарлаа"}\`**`,
                    footer: {
                      text: "© 2021. 14K"
                    }
                }
            });
        };
    return message.reply({
      embed: {
          color: "#FF0000",
          description: `\`\`\`Серверт дуу тоглуулаагүй байгаа тул комманд ажиллаж чадсангүй.\`\`\``,
          footer: {
              text: "© 2021. 14K"
          }
      }
    }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
  },
};
