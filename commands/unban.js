const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: 'unban',
    description: 'Энэ комманд нь тухайн гишүүнд серверээс тавьсан хоригийг цуцлах үүрэгтэй.',

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
                description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        let reason = args.slice(1).join(" ");
        
        let target = args[0]

        if(!reason) reason = `Бан гаргасан ${message.author.tag}`;
        if(!target) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөгөө :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүний серверээс тавьсан хоригийг цуцлах үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}unban [Гишүүн] [Шалтгаан эсвэл хоосон] гэж бичсэнээр тухайн гишүүний серверээс тавьсан хоригийг цуцлана.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        message.guild.fetchBans().then(async bans => {
            if(bans.size == 0) return message.reply({
                embed: {
                    color: "#00FF00",
                    title: 'Анхааруулга :exclamation:',
                    description: `\`\`\`Серверээс хориг тавьсан хүн олдоогүй тул комманд ажиллаж чадсангүй.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

            bans.forEach(u => {
                if(target === u.user.username) {
                    message.reply({
                        embed: {
                            color: "#679ad8",
                            title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                            description: `\`\`\`${u.user.username} гишүүний серверээс тавьсан хоригийг амжилттай аргалаа.\`\`\``,
                            footer: {
                                text: "© 2021. 14K"
                            }
                        }
                    }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
                    message.guild.members.unban(u.user.id, reason)
                } else if(target === u.user.id){
                    message.reply({
                        embed: {
                            color: "#679ad8",
                            title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                            description: `\`\`\`${u.user.username} гишүүний серверээс тавьсан АИДИ хоригийг амжилттай аргалаа.\`\`\``,
                            footer: {
                                text: "© 2021. 14K"
                            }
                        }
                    }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
                    message.guild.memebers.unban(u.user.id, reason)
                } else {
                    return message.reply({
                        embed: {
                            color: "#FF0000",
                            title: 'Алдаа гарлаа :x:',
                            description: `\`\`\`${u.user.username} гишүүнд серверээс хориг тавиагүй байсан тул комманд ажиллаж чадсангүй.\`\`\``,
                            footer: {
                                text: "© 2021. 14K"
                            }
                        }
                    }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
                }
            })
        });
    }
}