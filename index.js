const { Collection, Client, MessageEmbed, Intents } = require('discord.js')
const { Player } = require('discord-player')
const db = require('quick.db')
const moment = require('moment')
require("moment-duration-format");
const { readdirSync } = require('fs');
const allIntents = new Intents(32767)
const client = new Client({ intents: allIntents })
client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer)
client.commands = new Collection()
const player = client.player
const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
  delete require.cache[require.resolve(`./commands/${file}`)]
}
[client.config.antiCrash ? "antiCrash" : null].filter(Boolean).forEach(handler => { require(`./handlers/${handler}`)(client) })
// player.on('error', (queue, error) => {
//   console.log(`There was a problem with the song queue => ${error.message}`);
// });
// player.on('connectionError', (queue, error) => {
//   console.log(`I'm having trouble connecting => ${error.message}`);
// });
player.on('trackStart', (queue, track) => {
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return
  const startEmbed = new MessageEmbed()
    .setColor('#679ad8')
    .setDescription(`\`\`\`${queue.connection.channel.name} дуут сувагт ${track.title} дуу тоглож эхэллээ.\`\`\``)
  queue.metadata.send({ embeds: [startEmbed] })
});
player.on('trackAdd', (queue, track) => {
  const addEmbed = new MessageEmbed()
    .setColor('#679ad8')
    .setDescription(`\`\`\`${track.title} тоглуулах жагсаалтанд нэмэгдлээ\`\`\``)
  queue.metadata.send({ embeds: [addEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 30000) })
});
player.on('botDisconnect', (queue) => {
  const kickedEmbed = new MessageEmbed()
    .setColor('#679ad8')
    .setDescription(`\`\`\`Намайг дуут сувгаас хөөсөн тул тоглуулах жагсаалт цуцлагдлаа.\`\`\``)
  queue.metadata.send({ embeds: [kickedEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 30000) })
});
player.on('channelEmpty', (queue) => {
  const emptyEmbed = new MessageEmbed()
    .setColor('#679ad8')
    .setDescription(`\`\`\`Дуут сувагт хэрэглэгч байгаагүй тул дуут сувгаас гарлаа.\`\`\``)
  queue.metadata.send({ embeds: [emptyEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 30000) })
});
player.on('queueEnd', (queue) => {
  const endEmbed = new MessageEmbed()
    .setColor('#679ad8')
    .setDescription(`\`\`\`Дууг тоглуулж дууссан тул дуут сувгаас гарлаа.\`\`\``)
  queue.metadata.send({ embeds: [endEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 30000) })
});
client.on('ready', () => {
  console.log(`${client.user.username} аслаа.`)
  client.user.setActivity(`skunehelp`)
});
client.on('guildCreate', async (guild) => {
  let prefix = await db.fetch(`prefix_${guild.id}`)
  if (prefix == null) {
    prefix = 'skune'
  } else {
    prefix = prefix
  }
  const channels = (await guild.channels.fetch()).filter(ch => ch.permissionsFor(guild.me).has('SEND_MESSAGES') && ch.type === 'GUILD_TEXT')
  if (channels.length === 0) return;
  const randomChannel = channels.random()
  const channel = await client.channels.cache.get(randomChannel.id)
  const welcomeEmbed = new MessageEmbed()
    .setTitle(`Skune Дискорд Ботыг сервертээ нэмсэнд баярлалаа!`)
    .setDescription(`Намайг Skune гэдэг, таны хэрэгцээнд туслах олон төрлийн функцтай дискорд бот. Миний командын угтвар тэмдэг \`${prefix}\` хэрвээ та командын угтвар тэмдгийг солихыг хүсвэл \`${prefix}setprefix [Командыг Угтвар Тэмдэг]\` гэж бичсэнээр командыг угтвар тэмдгийг солих боломжтой.`)
    .addField(`__Skune юу хийж чадах вэ?__`, `Skune Дискорд Бот нь таны серверийг зохицуулахад туслах мөн олон төрлийн хөгжилтэй зугаатай командуудтай.`)
    .addField(`__Эхлэх__`, `Ашиглаж эхлэхийн тулд \`${prefix}help\` гэж бичсэнээр тусламж авах боломжтой.`)
    .setColor('#679ad8')
  await channel.send({ embeds: [welcomeEmbed] })
})
client.on('messageCreate', async (message) => {
  if (!message.inGuild()) return
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) {
    prefix = 'skune'
  } else {
    prefix = prefix
  }
  if (prefix != 'skune') {
    if (message.content.toLowerCase() == 'skuneprefix') {
      const prefixEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Командын угтвар тэмдэг ${prefix} дээр тохируулагдсан байна.\`\`\``)
      message.channel.send({ embeds: [prefixEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (message.content.toLowerCase().startsWith(prefix + 'stats')) {
    const duration = moment.duration(client.uptime).format(' D [өдөр], H [цаг], m [минут], s [секунд]')
    const embed = new MessageEmbed()
      .setColor('#679ad8')
      .addField('Хөгжүүлэгч', `\`\`\`sku14k#1263\`\`\``, true)
      .addField('Ажиллаж буй хугацаа', `\`\`\`${duration}\`\`\``, true)
      .addField('Хэрэглэгчдийн тоо', `\`\`\`${client.users.cache.size}\`\`\``, true)
      .addField('Бот байгаа серверүүдын тоо', `\`\`\`${client.guilds.cache.size}\`\`\``, true)
      .addField('Бот хувилбар', `\`\`\`1.0.5\`\`\``, true)
    message.channel.send({ embeds: [embed] })
  } else {
    if (!message.client.commands.has(command)) {
      const commandEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`Команд үсгийн алдаатай эсвэл олдоогүй тул та ${prefix}help гэж бичсэнээр тусламж авах боломжтой.\`\`\``)
      message.channel.send({ embeds: [commandEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
    }
    try {
      message.client.commands.get(command).execute(client, message, args)
    } catch (error) {
      console.error(error);
    }
  }
})
client.on('messageCreate', async (message) => {
  if (!message.inGuild()) return
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) {
    prefix = 'skune'
  } else {
    prefix = prefix
  }
  if (prefix != 'skune') {
    if (message.content.toLowerCase() == 'skunehelp') {
      const helpEmbed = new MessageEmbed()
        .setColor('#679ad8')
        .addFields(
          { name: 'Серверийн зохицуулалтын командуудыг харах', value: `\`\`\`${prefix}help moderation\`\`\``, inline: true },
          { name: 'Economy командуудыг харах', value: `\`\`\`${prefix}help economy\`\`\``, inline: true },
          { name: 'Дууны командуудыг харах', value: `\`\`\`${prefix}help music\`\`\``, inline: true },
          { name: 'Fun командуудыг харах', value: `\`\`\`${prefix}help fun\`\`\``, inline: true },
          { name: 'Тоглоомны командуудыг харах', value: `\`\`\`${prefix}help games\`\`\``, inline: true },
          { name: 'Нэмэлт командуудыг харах', value: `\`\`\`${prefix}help extras\`\`\``, inline: true },
          { name: 'Бүх командуудыг харах', value: `\`\`\`${prefix}commands\`\`\``, inline: true },
          { name: 'Командын мэдээлэллийг харах', value: `\`\`\`${prefix}info [Команд]\`\`\``, inline: true },
          { name: 'Нийгмийн холбоосуудыг харах', value: `\`\`\`${prefix}social\`\`\``, inline: true },
          { name: 'Ботын статистикийг харах', value: `\`\`\`${prefix}stats\`\`\``, inline: true },
          { name: 'Санал хүсэлт илгээх', value: `\`\`\`${prefix}suggest [Санал Хүсэлт]\`\`\``, inline: false },
          { name: 'Командын угтвар тэмдэг харах', value: `\`\`\`skuneprefix\`\`\``, inline: false },
          { name: 'Командын угтвар тэмдэг солих', value: `\`\`\`${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``, inline: false },
        )
      message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    }
  }
})
client.on('guildMemberAdd', async (member) => {
  const role = await db.has(`autorole-${member.guild.id}`);
  const mentionedPosition = member.guild.id.roles.highest.position
  const botPosition = message.guild.me.roles.highest.position
  if (botPosition <= mentionedPosition) {
    const autoRole = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`Миний role бага тул автомат role ажилласангүй.\`\`\``)
    return message.channel.send({ embeds: [autoRole] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
  }
  if (role === true) {
    member.roles.add(await db.get(`autorole-${member.guild.id}`))
  }
})
client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
    await db.delete(`afk-${message.author.id}+${message.guild.id}`)
    const afkEmbed = new MessageEmbed()
      .setColor('#679ad8')
      .setDescription(`\`\`\`Та afk байхаа болилоо.\`\`\``)
    message.channel.send({ embeds: [afkEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
  }

  if (message.mentions.members.first()) {
    if (db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
      const info = db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
      const [timestamp, reason] = info
      moment.updateLocale('en', {
        relativeTime: {
          future: "%s",
          past: "%s",
          s: 'Хэдэн секундын өмнө',
          ss: '%d секундын өмнө',
          m: "Минутын өмнө",
          mm: "%d минутын өмнө",
          h: "Цагийн өмнө",
          hh: "%d цагийн өмнө",
          d: "Өдрийн өмнө",
          dd: "%d өдрийн өмнө",
          M: "Сарын өмнө",
          MM: "%d сарын өмнө",
          y: "Жилийн өмнө",
          yy: "%d жилийн өмнө"
        }
      });
      const timeAgo = moment(timestamp).fromNow()
      const afkHas = new MessageEmbed()
        .setColor('#679ad8')
        .setDescription(`\`\`\`${message.mentions.members.first().user.tag} хэрэглэгч afk байна.\n\nШалтгаан: ${reason}.\n\nХэзээ: ${timeAgo}\`\`\``)
      message.channel.send({ embeds: [afkHas] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
    } else return;
  } else;
})
client.login(client.config.token)