const Discord = module.require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "trigger",
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        const user = message.mentions.members.first();
        if (!user) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}trigger [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }.then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) }))
        }
        const avatar = user.user.displayAvatarURL({ size: 2048, format: "png" });

        await message.channel.send({
            files: [
                {
                    attachment: `https://some-random-api.ml/canvas/triggered?avatar=${avatar}`,
                    name: "file.jpg",
                },
            ],
        });
    },
};