const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ban',
    description: 'Энэ комманд нь бандах үүрэгтэй.',
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if(prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes;
        }

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Танд энэ коммандыг ажиллуулах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ажиллуулх эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);

        if(!reason) reason = "Шалтгаангүй.";

        if(!args[0]) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнд серверээс хориг тавих үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}ban [Гишүүн] [Шалтгаан эсвэл хоосон] гэж бичсэнээр гишүүнд серверээс хориг тавигдана.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        if(!mentionedMember) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Дурдсан гишүүн серверт байгаагүй эсвэл та дурдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!mentionedMember.bannable) return message.reply({
            embed: {
                color: "#FF0000",
                description: `\`\`\`Надад дурдсан гишүүнд хориг тавих эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        var date = `${message.createdAt.getFullYear()} оны ${(message.createdAt.getMonth()+1)}-р сарын ${message.createdAt.getDate()}-нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`;

        const banEmbed = new Discord.MessageEmbed()
            .setTitle('Зарлал :exclamation:')
            .setDescription(`\`\`\`Танд ${message.guild.name} серверээс хориг тавьсан тул та серверлүү орж чадахгүй.\`\`\``)
            .addFields(
                {
                    name: `Шалтгаан`,
                    value: `\`\`\`${reason}\`\`\``
                },
                {
                    name: `Хэзээ`,
                    value: `\`\`\`${date}\`\`\``
                },
            )
            .setColor('FF8F00')
            .setFooter("© 2021. 14K")
        await mentionedMember.send(banEmbed).catch(err => console.log(err));
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.reply({
            embed: {
                color: "#679ad8",
                title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                description: `\`\`\`${mentionedMember.user.tag} гишүүнд амжилттай хориг тавьлаа.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000})));
    }
}