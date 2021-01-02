const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "corona",
    async execute(client, message, args) {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return;
            // message.channel.send(`***${args[0]}*** doesn't exist, or data isn't being collected`)
        }

        const first = args[0];
        const embed = new MessageEmbed()
            .setTitle(args[0] ? `${first.charAt(0).toUpperCase() + first.slice(1)} улсын коронавирусын тухай мэдээлэл ℹ` : 'Дэлхийн нийтийн коронавирусын тухай мэдээлэл ℹ')
            .setColor('#679ad8')
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/KS5cTZSqkUOSykR1fF.gif')
            .addFields(
                {
                    name: 'Нийт өвчилсөн',
                    value: `\`\`\`${corona.cases.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Нийт нас барсан',
                    value: `\`\`\`${corona.deaths.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Нийт эдгэрсэн',
                    value: `\`\`\`${corona.recovered.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Идэвхитэй байгаа',
                    value: `\`\`\`${corona.active.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Хүнд байгаа',
                    value: `\`\`\`${corona.critical.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Өнөөдөр эдгэрсэн',
                    value: `\`\`\`${corona.todayRecovered.toLocaleString().replace("-", "")}\`\`\``,
                    inline: true
                },
                {
                    name: 'Өнөөдөр нас барсан',
                    value: `\`\`\`${corona.todayDeaths.toLocaleString()}\`\`\``,
                    inline: true
                },
                {
                    name: 'Өнөөдөр өвчилсөн',
                    value: `\`\`\`${corona.todayCases.toLocaleString()}\`\`\``,
                    inline: true
                })

        await message.channel.send(embed)
    }
};