const { MessageEmbed } = require('discord.js');
const { execute } = require('./corona');

module.exports = {
    name: "userinfo",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "Сүлжээнд идэвхитэй байгаа";
                break;
            case "dnd":
                status = "Бүү садаа бол";
                break;
            case "idle":
                status = "Сул чөлөөтэй";
                break;
            case "offline":
                status = "Сүлжээнд холбогдоогүй байгаа";
                break;
        }
        var datestring = `${user.joinedAt.getFullYear()} оны ${(user.joinedAt.getMonth()+1)}-р сарын ${user.joinedAt.getDate()}-нд ${user.joinedAt.getHours()} цаг ${user.joinedAt.getMinutes()} минут`
        var datestrung = `${user.user.createdAt.getFullYear()} оны ${(user.user.createdAt.getMonth()+1)}-р сарын ${user.user.createdAt.getDate()}-нд ${user.user.createdAt.getHours()} цаг ${user.user.createdAt.getMinutes()} минут`
        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} гишүүний мэдээлэл`)
            .setColor(`#679ad8`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Нэр",
                    value: `\`\`\`${user.user.username}\`\`\``,
                    inline: true
                },
                {
                    name: "#️⃣ Арын дугаар",
                    value: `\`\`\`#${user.user.discriminator}\`\`\``,
                    inline: true
                },
                {
                    name: "🆔 АИДИ",
                    value: `\`\`\`${user.user.id}\`\`\``,
                    inline: false
                },
                {
                    name: "Одоогийн байдал",
                    value: `\`\`\`${status}\`\`\``,
                    inline: false
                },
                {
                    name: 'Дискорд хаяг нээсэн огноо',
                    value: `\`\`\`${datestrung}\`\`\``,
                    inline: false
                },
                {
                    name: 'Серверт нэгдсэн огноо',
                    value: `\`\`\`${datestring}\`\`\``,
                    inline: false
                },
                {
                    name: 'Ажил үүрэгүүд',
                    value: `\`\`\`${user.roles.cache.size - 1 ? user.roles.cache.map(e => e.name).filter(x => x !== "@everyone").join(", ") : 'Байхгүй'}\`\`\``,
                    inline: false
                }
            )

        await message.channel.send(embed)
    }
}