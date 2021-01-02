const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: "Энэ комманд нь хүн гаргах үүрэгтэй.",
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if(prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes;
        }

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2020. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2020. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
       
        let reason = args.slice(1).join(" ");

        var date = `${message.createdAt.getFullYear()} оны ${(message.createdAt.getMonth()+1)}-р сарын ${message.createdAt.getDate()}-нд ${message.createdAt.getHours()} цаг ${message.createdAt.getMinutes()} минутанд`;

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!reason) reason = "Шалтгаангүй.";
        const kickEmbed = new Discord.MessageEmbed()
            .setDescription(`\`\`\`Та ${message.guild.name} серверээс хөөгдлөө.\`\`\``)
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
            .setColor('#679ad8')
            .setFooter("© 2020. 14K")

            if(!args[0]) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөгөө :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнийг серверээс гаргах үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}kick [Гишүүн] [Шалтгаан эсвэл хоосон] гэж бичсэнээр тухайн гишүүнийг серверээс гаргана.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2020. 14K"
                }
            }
            }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

            if(!mentionedMember) return message.reply({
                embed: {
                    color: "#FF0000",
                    title: 'Алдаа гарлаа :x:',
                    description: `\`\`\`Дурдсан хүн энэ серверт байгаагүй эсвэл та дурдаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                    footer: {
                        text: "© 2020. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
            
            try {
                await mentionedMember.send(kickEmbed);
            } catch(err) {
                console.log(`Энэ хүнийг серверээс гаргахад алдаа гарлаа.`);
            }

            try {
                await mentionedMember.kick(reason);
                message.reply({
                    embed: {
                        color: "#679ad8",
                        title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                        description: `\`\`\`${mentionedMember.user.tag} гишүүнийг амжилттай серверээс гаргалаа.\`\`\``,
                        footer: {
                            text: "© 2020. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
            } catch(err) {
                console.log(err);
                message.reply({
                    embed: {
                        color: "#FF0000",
                        title: 'Алдаа гарлаа :x:',
                        description: `\`\`\`${mentionedMember.user.tag} гишүүнийг серверээс гаргах явцад алдаа гарлаа.\`\`\``,
                        footer: {
                            text: "© 2020. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
            }
    }
}