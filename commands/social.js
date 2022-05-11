const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'social',
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription('Вэб сайт - [Над дээр дараарай](https://skune.tk)\nФейсбүүк хуудас - [Над дээр дараарай](https://skune.tk/facebook)\nТусламжийн сервер - [Над дээр дараарай](https://skune.tk/support)\nСервертээ нэмэх - [Над дээр дараарай](https://skune.tk/invite)\nҮйлчилгээний нөхцөл - [Над дээр дараарай](https://skune.tk/tos)')
    message.channel.send({ embeds: [embed] })
  }
};
