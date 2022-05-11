const Discord = module.require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "wiki",
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        const search = args.join("_");
        const msg = args.join(" ");
        if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}wiki [Хайх Зүйл]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
        const embed = new Discord.MessageEmbed()
            .setAuthor('Wikipedia', `https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2000px-Wikipedia-logo-v2.svg.png`)
            .setThumbnail(
                `https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2000px-Wikipedia-logo-v2.svg.png`
            )
            .addField(`Хайсан:`, `${msg}`)
            .addField(`Олдсон:`, `[Над дээр дараарай](${link})`)
            .setColor('#679ad8');

        message.channel.send({ embeds: [embed] });
    },
};