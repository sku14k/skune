const { Client, Message, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
  name: 'serverinfo',
  async execute(client, message, args) {
    const { guild } = message
    const { members, memberCount, description, emojis, stickers, channels } = guild

    const owner = await guild.fetchOwner()
    const threads = channels.cache.filter((c) => c.type === 'GUILD_NEWS_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size

    const nitroTier = {
      NONE: 'Байхгүй',
    }
    const serverDescription = {
      null: 'Байхгүй'
    }
    const verificationLevels = {
      NONE: "Энгийн",
      LOW: "Бага",
      MEDIUM: "Дунд",
      HIGH: "Өндөр",
      VERY_HIGH: "Маш өндөр",
    }

    let rolemap = []
    guild.roles.cache.each((role) => { rolemap.push(role.name) })

    let [month, date, year] = message.guild.createdAt.toLocaleDateString('en-US').split('/')

    const serverInfo = new MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor('#679ad8')
      .addFields(
        {
          name: 'Серверийн нэр',
          value: `\`\`\`${guild.name}\`\`\``,
          inline: false,
        },
        {
          name: 'Сервер эзэмшигч',
          value: `\`\`\`${owner.user.tag}\`\`\``,
          inline: true,
        },
        {
          name: 'Сервер ID',
          value: `\`\`\`${guild.id}\`\`\``,
          inline: true,
        },
        {
          name: 'Сервер нээгдсэн огноо',
          value: `\`\`\`${year} оны ${month}-р сарын ${date}\`\`\``,
          inline: false,
        },
        {
          name: 'Серверийн тайлбар',
          value: `\`\`\`${serverDescription[description]}\`\`\``,
          inline: false,
        },
        {
          name: "Сервер тохируулгийн түвшин",
          value: `\`\`\`${verificationLevels[message.guild.verificationLevel]}\`\`\``,
          inline: true,
        },
        {
          name: "Сервер баталгаажуулалт",
          value: `\`\`\`${message.guild.verified ? `Баталгаажуулагдсан` : `Баталгаажуулагдаагүй`}\`\`\``,
          inline: true,
        },
        {
          name: 'Серверийн Nitro Tier',
          value: `\`\`\`${nitroTier[guild.premiumTier.replace('TIER_', '')]}\`\`\``,
          inline: true,
        },
        {
          name: 'Серверийн нийт Nitro Boost',
          value: `\`\`\`${guild.premiumSubscriptionCount}\`\`\``,
          inline: true,
        },
        {
          name: 'Серверийн Nitro Boosterүүд',
          value: `\`\`\`${members.cache.filter((m) => m.premiumSince).size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт гишүүд',
          value: `\`\`\`${memberCount}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт хэрэглэгчид',
          value: `\`\`\`${members.cache.filter((m) => !m.user.bot).size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт bot',
          value: `\`\`\`${members.cache.filter((m) => m.user.bot).size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт ангилал',
          value: `\`\`\`${channels.cache.filter((c) => c.type === 'GUILD_CATEGORY').size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт текст суваг',
          value: `\`\`\`${channels.cache.filter((c) => c.type === 'GUILD_TEXT').size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт мэдээллийн суваг',
          value: `\`\`\`${channels.cache.filter((c) => c.type === 'GUILD_NEWS').size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт thread',
          value: `\`\`\`${threads}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт дуут суваг',
          value: `\`\`\`${channels.cache.filter((c) => c.type === 'GUILD_VOICE').size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт stage дуут суваг',
          value: `\`\`\`${channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт эможи',
          value: `\`\`\`${emojis.cache.filter((e) => !e.animated).size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт хөдөлгөөнт эможи',
          value: `\`\`\`${emojis.cache.filter((e) => e.animated).size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт sticker',
          value: `\`\`\`${stickers.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: 'Нийт role',
          value: `\`\`\`${message.guild.roles.cache.size}\`\`\``,
          inline: true,
        },
      )

    const serverTwo = new MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor('#679ad8')
      .setDescription(`\`\`\`Roleүүд:\n${rolemap.filter((x) => x !== '@everyone').join(', ')}\`\`\``)

    const button1 = new MessageButton()
      .setCustomId('previousbtn')
      .setLabel('Өмнөх')
      .setStyle('SECONDARY')

    const button2 = new MessageButton()
      .setCustomId('nextbtn')
      .setLabel('Дараах')
      .setStyle('SECONDARY')

    pages = [
      serverInfo,
      serverTwo,
    ]

    buttonList = [
      button1,
      button2
    ]

    paginationEmbed(message, pages, buttonList)
  }
}
