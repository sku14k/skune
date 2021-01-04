const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'setnick',
    description: "Энэ комманд нь гишүүнд хоч өгдөг.",
    async execute(message, args) {
        if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
        
        if(args.length >= 1){
            let mentionedMember = message.mentions.members.first();
            let nickname = -1
            if(!mentionedMember) {
                mentionedMember = message.member;
                let kn = message.content.split(' ');
                kn.shift();
                nickname = kn.join(' ');
                if(!mentionedMember.kickable) return message.reply({
                    embed: {
                        color: "#FF0000",
                        description: `\`\`\`Миний эрх гишүүний хочийг өөрчлөхөд хангалттай байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                        footer: {
                            text: "© 2021. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

                await mentionedMember.setNickname(nickname).catch(error => message.channel.send(error.message));
                message.reply({
                embed: {
                    color: "#679ad8",
                    title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                    description: `\`\`\`${mentionedMember.user.tag} гишүүний хочийг амжилттай ${nickname} болгож өөрчиллөө.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
                }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
            } else {
                let know = message.content.split(' ');
                know.shift();
                know.shift();
                nickname = know.join(' ');
                if(!mentionedMember.kickable) return message.reply({
                    embed: {
                        color: "#FF0000",
                        title: 'Алдаа гарлаа :x:',
                        description: `\`\`\`Миний эрх гишүүний хочийг өөрчлөхөд хангалттай байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                        footer: {
                            text: "© 2021. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 10000})).then(message.delete({timeout: 10000}));
                
                await mentionedMember.setNickname(nickname).catch(error => message.channel.send(error.message));
                message.reply({
                    embed: {
                        color: "#679ad8",
                        title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                        description: `\`\`\`${mentionedMember.user.tag} гишүүний хочийг амжилттай ${nickname} болгож өөрчиллөө.\`\`\``,
                        footer: {
                            text: "© 2021. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
            }
        } else {
            let prefix;
            let prefixes = await db.fetch(`prefix_${message.guild.id}`);

            if(prefixes == null) {
            prefix = 'skune'
            } else {
            prefix = prefixes;
            }

            message.reply({
                embed: {
                    color: "#FFFF00",
                    description: `\`\`\`Комманд ажиллуулах зөвлөгөө: ${prefix}setnick [Гишүүн] [Хоч] эсвэл ${prefix}setnick [Хоч] гэж бичсэнээр хоч өөрчлөгдөнө.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));
        }
    }
}