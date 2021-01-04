const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('skune бот аслаа.');
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

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return message.reply({
        embed: {
            title: 'Комманд ажиллуулах зөвлөгөө :woman_tipping_hand:',
            color: '#FFFF00',
            description: `\`\`\`Таны бичсэн комманд үсгийн алдаатай эсвэл олдоогүй тул та ${prefix}help гэж бичсэнээр тусламж авах боломжтой.\`\`\``,
            footer: {
                text: "© 2020. 14K",
            },
        },
    });
    try {
        client.commands.get(command).execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply({
            embed: {
                title: 'Комманд ажиллуулах явцад гэнэтийн алдаа гарлаа :x:',
                color: '#FF0000',
                description: `\`\`\`Та комманд тэмдэгээ буруу бичсэн эсвэл тухайн ажиллуулах гэсэн комманд байгаагүй тул гэнэтийн алдаа гарлаа`,
                footer: {
                    text: "© 2020. 14K",
                },
            },
        });
    }
});

client.login(process.env.token);