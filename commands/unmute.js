const { Message } = require('discord.js');
const { execute } = require('./clear');
const db = require('quick.db');

module.exports=  {
    name : 'unmute', 
    description: 'Энэ комманд нь тухайн хүнийг хэлтэй болгох үүрэгтэй.',
    /**
     * @param {Message} message
     */
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if(prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes;
        }

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Танд энэ коммандыг ажиллуулах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Надад энэ коммандыг ажиллуулх эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));


        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнийг хэлтэй болгох үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}unmute [Гишүүн] гэж бичсэнээр гишүүн хэлтэй болно.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'хэлгүй хүн');

        await Member.roles.remove(role)

        message.reply({
            embed: {
                color: "#679ad8",
                title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                description: `\`\`\`${Member.displayName} гишүүнийг амжилттай хэлтэй болголоо.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
    }
}