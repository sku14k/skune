const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const { execute } = require('./clear')

module.exports = {
    name : 'tempmute',
    description: 'Энэ комманд нь тухайн гишүүнийг түр чимээгүй болгох үүрэгтэй.',
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
                description: `\`\`\`Танд энэ коммандыг ашиглах эрх байгаагүй тул комманд ажиллаж чадсангүй.\`\`\``,
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
        const time = args[1]
        if(!Member) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнийг түр чимээгүй болгох үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}tempmute [Гишүүн] [Хугацаа] гэж бичсэнээр гишүүн түр чимээгүй болно.\`\`\``,
                    },
                    {
                        name: 'Жишээ',
                        value: `\`\`\`${prefix}tempmute @sku14k 30s гэж бичсэнээр гишүүнийг гучин секунд чимээгүй болгоно.\`\`\``,
                    }
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        if(!time) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн гишүүнийг түр чимээгүй болгох үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}tempmute [Гишүүн] [Хугацаа] гэж бичсэнээр гишүүн түр чимээгүй болно.\`\`\``,
                    },
                    {
                        name: 'Жишээ',
                        value: `\`\`\`${prefix}tempmute @sku14k 30s гэж бичсэнээр гишүүнийг гучин секунд чимээгүй болгоно.\`\`\``,
                    }
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'ус балгасан')
        if(!role) {
            try {
                message.reply({
                    embed: {
                        color: "FF8F00",
                        title: 'Зарлал :grey_exclamation:',
                        description: `\`\`\`Ус балгасан гэсэн ажил үүрэг олдоогүй тул шинээр үүсгэж байна.\`\`\``,
                        footer: {
                            text: "© 2021. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'ус балгасан',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.reply({
                    embed: {
                        color: "FF8F00",
                        title: 'Зарлал :grey_exclamation:',
                        description: `\`\`\`Ус балгасан гэсэн ажил үүрэг амжилттай шинээр үүсгэлээ.\`\`\``,
                        footer: {
                            text: "© 2021. 14K"
                        }
                    }
                }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'ус балгасан')
        if(Member.roles.cache.has(role2.id)) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`${Member.displayName} гишүүн аль хэдийнээ ус балгасан байна.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        await Member.roles.add(role2)
        message.reply({
            embed: {
                color: "#679ad8",
                title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                description: `\`\`\`${Member.displayName} гишүүнийг амжилттай ус балгууллаа.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.reply({
                embed: {
                    color: "#679ad8",
                    title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                    description: `\`\`\`${Member.displayName} гишүүн амжилттай амандах усаа асгалаа.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
        }, ms(time))
    }
}