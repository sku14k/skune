const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'covid',
  async execute(client, message, args) {
    const baseUrl = 'https://corona.lmao.ninja/v2'

    let url, response, corona

    try {
      url = args[0] ? `${baseUrl}/countries/${args[0]}` : `${baseUrl}/all`
      response = await axios.get(url)
      corona = response.data
    } catch (error) { return }
    const first = args[0]
    const embed = new MessageEmbed()
      .setColor('#679ad8')
      .setThumbnail(
        args[0] ? corona.countryInfo.flag : 'https://i.imgur.com/hJ6hT8O.jpg'
      )
      .addFields(
        {
          name: 'Өвчилсөн',
          value: `\`\`\`${corona.cases.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Нас баралт',
          value: `\`\`\`${corona.deaths.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Эдгэрсэн',
          value: `\`\`\`${corona.recovered.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Идэвхитэй байгаа',
          value: `\`\`\`${corona.active.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Хүнд байгаа',
          value: `\`\`\`${corona.critical.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Өнөөдөр эдгэрсэн',
          value: `\`\`\`${corona.todayRecovered
            .toLocaleString()
            .replace('-', '')}\`\`\``,
          inline: true,
        },
        {
          name: 'Өнөөдөр нас барсан',
          value: `\`\`\`${corona.todayDeaths.toLocaleString()}\`\`\``,
          inline: true,
        },
        {
          name: 'Өнөөдөр өвчилсөн',
          value: `\`\`\`${corona.todayCases.toLocaleString()}\`\`\``,
          inline: true,
        }
      )
    await message.channel.send({ embeds: [embed] })
  }
}
