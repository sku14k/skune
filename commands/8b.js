//.then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: '8b',
  async execute(client, message, args) {
    let prefix
    let prefixes = await db.fetch(`prefix_${message.guild.id}`)
    if (prefixes == null) {
      prefix = 'skune'
    } else {
      prefix = prefixes
    }
    const helpEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`${prefix}8b [Асуулт]\`\`\``)
    if (!args[0]) return await message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    let replies = ['Тийнн гөхшөө', 'Мэдкүэээ бро', 'Яахымбээ андаа', 'Тэг тэг тэг', 'Бро миндээ...', 'Дэмий дэмий', 'Үгүй-тийм', 'Тийм-үгүй', 'Мань мэдкүээ']
    let result = Math.floor((Math.random() * replies.length))
    let question = args.slice().join(' ')
    let ballEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`${replies[result]}\`\`\``)
    message.channel.send({ embeds: [ballEmbed] })
  }
}
