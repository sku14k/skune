const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'sr',
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if(prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes;
        }

        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Танд энэ коммандыг ажиллуулах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("MANAGE_MEMBERS")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ажиллуулх эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        
        if(!rMember) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнд ажил үүрэг өгөх үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}sr [Гишүүн] [Ажил Үүрэг] гэж бичсэнээр гишүүнд ажил үүрэг өгнө.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        let role = args.join(" ").slice(22);
        if(!role) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнд ажил үүрэг өгөх үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}sr [Гишүүн] [Ажил Үүрэг] гэж бичсэнээр гишүүнд ажил үүрэг өгнө.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        let gRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === role);
        
        if(!gRole) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Таны дурдсан ажил үүрэг олдсонгүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));

        try {
            await message.reply({
                embed: {
                    color: "#679ad8",
                    title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                    description: `\`\`\`${rMember} гишүүнд амжилттай ${gRole.name} гэсэн ажил үүрэг олголоо.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
        } catch(e) {
            message.reply({
                embed: {
                    color: "#FF0000",
                    title: 'Алдаа гарлаа :x:',
                    description: `\`\`\`Гэнэтийн алдаа гарлаа.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
        }
    }
}