const { Client, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
  name: 'meme',
  async execute(client, message, args) {
    let res = await axios.default.get(`https://www.reddit.com/r/memes/random/.json`)

    if (!res || !res.data || !res.data.length) return

    res = res.data[0].data.children[0].data

    const memeEmbed = new MessageEmbed()
      .setTitle(res.title)
      .setColor('#679ad8')
      .setImage(res.url)
      .setURL(`https://www.reddit.com${res.permalink}`)
    message.channel.send({ embeds: [memeEmbed] })
  }
}
