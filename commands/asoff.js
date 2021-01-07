const rdb = require('../reconDB');

module.exports = {
    name: 'asoff',
    description: 'Anti swear off',
    async execute(message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply({
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

        if(await rdb.has(`swear-${message.guild.id}`) === true) {
            
            await rdb.delete(`swear-${message.guild.id}`);
            message.reply({
                embed: {
                    color: "#679ad8",
                    title: 'Комманд амжилттай ажиллаа :white_check_mark:',
                    description: `\`\`\`Хараалын үг шүүгч унтарлаа.\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        } else return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Хараалын үг шүүгч аль хэдийнээ унтарсан байна.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));
    }
}