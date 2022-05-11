const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')
const db = require('quick.db')

module.exports = {
  name: 'weather',
  async execute(client, message, args) {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)

    if (prefix == null) {
      prefix = 'skune'
    } else {
      prefix = prefix
    }

    let city = args.join(' ');
    let degreetype = 'C';

    await weather.find({ search: city, degreeType: degreetype },
      function (err, result) {
        if (!city) {
          const cityEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${prefix}weather [Хот]\`\`\``)
          return message.channel.send({ embeds: [cityEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        if (err || result === undefined || result.length === 0) {
          const errorEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Дурдсан хот олдсонгүй.\`\`\``)
          return message.channel.send({ embeds: [errorEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        let current = result[0].current;
        let location = result[0].location;

        const embed = new MessageEmbed()
          .setAuthor({ name: current.observationpoint })
          .setDescription(`> ${current.skytext}`)
          .setThumbnail(current.imageUrl)
          .setColor('#679ad8');

        embed
          .addField('Өргөрөг', `\`\`\`${location.lat}\`\`\``, true)
          .addField('Уртраг', `\`\`\`${location.long}\`\`\``, true)
          .addField(
            'Мэдрэгдэх градус',
            `\`\`\`${current.feelslike}° градус\`\`\``,
            true
          )
          .addField('Салхи', `\`\`\`${current.winddisplay}\`\`\``, true)
          .addField('Чийгшил', `\`\`\`${current.humidity}%\`\`\``, true)
          .addField('Цагийн бүс', `\`\`\`GMT ${location.timezone}\`\`\``, true)
          .addField(
            'Температур',
            `\`\`\`${current.temperature}° градус\`\`\``,
            true
          )
          .addField(
            'Ажиглалтын цаг',
            `\`\`\`${current.observationtime}\`\`\``,
            true
          );

        return message.channel.send({ embeds: [embed] })
      }
    );
  },
};
