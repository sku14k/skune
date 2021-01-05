const Discord = require("discord.js");
const weather = require("weather-js");
const db = require('quick.db');

module.exports = {
    name: 'weather',
    description: 'Энэ комманд нь тухайн улсын цаг агаарын мэдээллийг харуулах үүрэгтэй.',
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if(prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes;
        }
    let city = args.join(" ");
    let degreetype = "C";

    await weather.find({search: city, degreeType: degreetype}, function(err, result) {
        if (!city) return message.reply({
            embed: {
                color: "#FFFF00",
                title: 'Комманд ажиллуулах зөвлөмж :woman_tipping_hand:',
                description: `\`\`\`Энэ комманд нь тухайн хотын цаг агаарыг харуулах үүрэгтэй.\`\`\``,
                fields: [
                    {
                        name: 'Зөвлөмж',
                        value: `\`\`\`${prefix}weather [Хот] гэж бичсэнээр хотын цаг агаарыг харах болно.\`\`\``,
                    },
                ],
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 60000})).then(message.delete({timeout: 60000}));

        if (err || result === undefined || result.length === 0) return message.reply({
            embed: {
                color: "#FF0000",
                title: 'Алдаа гарлаа :x:',
                description: `\`\`\`Таны дурдсан хот олдсонгүй.\`\`\``,
                footer: {
                    text: "© 2021. 14K"
                }
            }
        }).then(m => m.delete({timeout: 15000})).then(message.delete({timeout: 15000}));

        let current = result[0].current;
        let location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setAuthor(current.observationpoint)
        .setDescription(`> ${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setColor('#679ad8')

        embed.addField("Өргөрөг", `\`\`\`${location.lat}\`\`\``, true)
        .addField("Уртраг", `\`\`\`${location.long}\`\`\``, true)
        .addField("Мэдрэгдэх градус", `\`\`\`${current.feelslike}° градус\`\`\``, true)
        .addField("Салхи", `\`\`\`${current.winddisplay}\`\`\``, true)
        .addField("Чийгшил", `\`\`\`${current.humidity}%\`\`\``, true)
        .addField("Цагийн бүс", `\`\`\`GMT ${location.timezone}\`\`\``, true)
        .addField("Температур", `\`\`\`${current.temperature}° градус\`\`\``, true)
        .addField("Ажиглалтын цаг", `\`\`\`${current.observationtime}\`\`\``, true)

        return message.channel.send(embed);
    })
    }
};
