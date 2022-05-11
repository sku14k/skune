const Discord = require("discord.js");
const ms = require('ms');
const db = require('quick.db')

module.exports = {
    name: "ga",
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        const TimePeriod = new Discord.MessageEmbed()
            .setColor("#679ad8")
            .setDescription(`\`\`\`${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``)

        const NoTime = new Discord.MessageEmbed()
            .setColor("#679ad8")
            .setDescription(`\`\`\`${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``)



        const NotANumber = new Discord.MessageEmbed()
            .setColor("#679ad8")
            .setDescription(`\`\`\`Хугацаа натурал тоо байх ёстой.\`\`\``)

        const NoChannel = new Discord.MessageEmbed()
            .setColor("#679ad8")
            .setDescription(`\`\`\`${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``)


        const NoPrize = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`\`\`\`${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``)

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            const banError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд ga командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('MANAGES_MESSAGES')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад ga командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        if (!args[0]) return message.channel.send({ embeds: [NoTime] });
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("m")
        )


            return message.channel.send({ embeds: [TimePeriod] });

        if (isNaN(args[0][0])) return message.channel.send({ embeds: [NotANumber] });
        let channel = message.mentions.channels.first();
        if (!channel)

            return message.channel.send({ embeds: [NoChannel] });
        let prize = args.slice(2).join(" ");

        if (!prize) return message.channel.send({ embeds: [NoPrize] });
        const gaEmbed = new Discord.MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Giveaway #${channel.name} текст сувагт явагдаж байна.\`\`\``)
        message.channel.send({ embeds: [gaEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Giveaway`)
            .setDescription(
                `\`\`\`${message.author.tag} хэрэглэгч ${prize} шагналтай giveaway зарлаж байна.\`\`\``
            )
            .setTimestamp(Date.now() + ms(args[0]))
        let m = await channel.send({ embeds: [Embed] });
        m.react("🎉");

        setTimeout(() => {
            if (m.reactions.cache.get("🎉").count <= 1) {
                const reactionsEmbed = new Discord.MessageEmbed()
                    .setColor('#679ad8')
                    .setDescription(`\`\`\`Хангалттай хүмүүс giveawayд оролцоогүй тул цуцлагдлаа.\`\`\``)
                // message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
                return message.channel.send({ embeds: [reactionsEmbed] });
            }

            let winner = m.reactions.cache
                .get("🎉")
                .users.cache.filter((u) => !u.bot)
                .random();
            const winnerEmbed = new Discord.MessageEmbed()
                .setColor("#679ad8")
                .setDescription(`\`\`\`Giveawayын ялагч ${winner.tag} боллоо! Баяр хүргэе!\`\`\``)
            channel.send({ embeds: [winnerEmbed] });
        }, ms(args[0]));

    }
}