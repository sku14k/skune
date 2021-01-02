const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');

client.commands = new Discord.Collection();
client.queue = new Map();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('skune бот аслаа.');
});

client.on("guildCreate", guild => {
    var found = false;
    guild.channels.cache.forEach((channel)=>{
        if(found == true || channel.type != "text") {
          return;
        }
        if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
          found = true;
          let embed = new Discord.MessageEmbed()
            .setTitle("skune бот амжилттай серверт нэгдлээ :wave:")
            .setAuthor('sku14k#1263 - Хөгжүүлэгч', 'https://i.imgur.com/asbpULZ.jpg')
            .setDescription("skune бот-ыг сонгон ашиглаж байгаа танд маш их баярлалаа :hugging: ")
            .addFields(
                { name: 'Ашиглах заавар', value: 'Та `skunehelp` гэж бичсэнээр тусламж авах боломжтой.' },
                { name: 'Комманд тэмдэг солих заавар', value: '`skunesetprefix [Шинэ Комманд Тэмдэг]` гэж бичсэнээр комманд тэмдэг солигдоно.'},
                { name: 'Дэлгэрэнгүй', value: 'Бусад дэлгэрэнгүй мэдээллийг https://skunebot.com/ -оос авна уу.'},
            )
            .setColor("#679ad8")
            .setFooter("© 2020. 14K");
          return channel.send(embed);
        }
    })
});

client.on('message', async message => {
    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if(prefixes == null) {
        prefix = 'skune'
    } else {
        prefix = prefixes;
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear') client.commands.get('clear').execute(message, args);
    if(command === 'serverinfo') client.commands.get('serverinfo').execute(message, args);
    if(command === 'setprefix') client.commands.get('setprefix').execute(message, args);
    if(command === 'ban') client.commands.get('ban').execute(message, args);
    if(command === 'unban') client.commands.get('unban').execute(message, args, client);
    if(command === 'setnick') client.commands.get('setnick').execute(message, args);
    if(command === 'kick') client.commands.get('kick').execute(message, args, client);
    if(command === 'say') client.commands.get('say').execute(message, args);
    if(command === 'mute') client.commands.get('mute').execute(message, args, client);
    if(command === 'tempmute') client.commands.get('tempmute').execute(message, args, clienta);
    if(command === 'unmute') client.commands.get('unmute').execute(message, args, client);
    if(command === 'warn') client.commands.get('warn').execute(message, args, client);
    if(command === 'warns') client.commands.get('warns').execute(message, args, client);
    if(command === 'play') client.commands.get('play').execute(message, args, client);
    if(command === 'resume') client.commands.get('resume').execute(message, args, client);
    if(command === 'stop') client.commands.get('stop').execute(message, args, client);
    if(command === 'volume') client.commands.get('volume').execute(message, args, client);
    if(command === 'np') client.commands.get('np').execute(message, args, client);
    if(command === 'afk') client.commands.get('afk').execute(message, args, client);
    if(command === 'lyrics') client.commands.get('lyrics').execute(message, args, client);
    if(command === 'pause') client.commands.get('pause').execute(message, args, client);
    if(command === 'playlist') client.commands.get('playlist').execute(message, args, client);
    if(command === 'queue') client.commands.get('queue').execute(message, args, client);
    if(command === 'remove') client.commands.get('remove').execute(message, args, client);
    if(command === 'search') client.commands.get('search').execute(message, args, client);
    if(command === 'skip') client.commands.get('skip').execute(message, args, client);
    if(command === 'skipto') client.commands.get('skipto').execute(message, args, client);
    if(command === 'setwelcome') client.commands.get('setwelcome').execute(message, args, client);
    if(command === 'setleave') client.commands.get('setleave').execute(message, args, client);
    if(command === 'loop') client.commands.get('loop').execute(message, args, client);
    if(command === 'shuffle') client.commands.get('shuffle').execute(message, args, client);
    if(command === 'help') client.commands.get('help').execute(message, args, client);
    if(command === 'avatar') client.commands.get('avatar').execute(message, args, client);
    if(command === 'corona') client.commands.get('corona').execute(client, message, args);
    if(command === 'weather') client.commands.get('weather').execute(client, message, args);
    if(command === 'hug') client.commands.get('hug').execute(client, message, args);
    if(command === 'userinfo') client.commands.get('userinfo').execute(client, message, args);
});

client.on("guildMemberAdd", (member) => {
    let chx = db.get(`welchannel_${member.guild.id}`);

    if(chx === null) return;

    var datestring = `${member.user.createdAt.getFullYear()} оны ${(member.user.createdAt.getMonth()+1)}-р сарын ${member.user.createdAt.getDate()}-нд ${member.user.createdAt.getHours()} цаг ${member.user.createdAt.getMinutes()} минут`
    let wembed = new Discord.MessageEmbed()
        .setColor("#679ad8")
        .addFields(
            {
                name: 'ID',
                value: `\`\`\`${member.user.id}\`\`\``,
            },
            {
                name: 'Гишүүний дискорд хаяг нээгдсэн огноо',
                value: `\`\`\`${datestring}\`\`\``,
            }
        )
        .setFooter("© 2020. 14K")
        .setAuthor(`Тавтай морил, ${member.user.username}`, client.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        
    client.channels.cache.get(chx).send(wembed);
});

client.on("guildMemberRemove", (member) => {
    let chx = db.get(`leachannel_${member.guild.id}`);

    if(chx === null) return;

    var datestring = `${member.joinedAt.getFullYear()} оны ${(member.joinedAt.getMonth()+1)}-р сарын ${member.joinedAt.getDate()}-нд ${member.joinedAt.getHours()} цаг ${member.joinedAt.getMinutes()} минут`
    let wembed = new Discord.MessageEmbed()
        .setAuthor(`Баяртай, ${member.user.username}`, client.user.displayAvatarURL())
        .setColor("#679ad8")
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            {
                name: 'ID',
                value: `\`\`\`${member.user.id}\`\`\``,
            },
            {
                name: 'Гишүүний серверт нэгдсэн огноо',
                value: `\`\`\`${datestring}\`\`\``,
            },
            {
                name: 'Гишүүний ажил үүрэгүүд',
                value: `\`\`\`${member.roles.cache.size - 1 ? member.roles.cache.map(e => e.name).filter(x => x !== "@everyone").join(", ") : 'Байхгүй'}\`\`\``,
            }
        )
        .setFooter("© 2020. 14K")
        
    client.channels.cache.get(chx).send(wembed);
});

client.login(process.env.token);