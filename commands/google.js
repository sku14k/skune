const Discord = module.require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "google",
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        const text1 = args.join(" ");
        const text2 = args.join("+");
        const google = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`;
        if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}google [Хайх Зүйл]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                "Google",
                `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`
            )
            .setThumbnail(
                `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`
            )
            // .setDescription(
            //     `**Хайсан: **\n${text1} \n**Олдсон: **\n[Над дээр дараарай](https://google.com/search?q=${text2})`
            // )
            .addField(`Хайсан:`, `${text1}`)
            .addField(`Олдсон:`, `[Над дээр дараарай](https://google.com/search?q=${text2})`)
            .setThumbnail(google)
            .setColor('#679ad8');
        message.channel.send({ embeds: [embed] });
    },
};