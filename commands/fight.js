const { Fight } = require('weky')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'fight',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        if (!message.mentions.members.first()) {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${prefix}fight [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 60000) })
        }
        await Fight({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Зодоон',
                color: '#679ad8',
            },
            buttons: {
                hit: 'Цохих',
                heal: 'Өөрийгөө эдгээх',
                cancel: 'Болих',
                accept: 'Зөвшөөрөх',
                deny: 'Цуцлах'
            },
            acceptMessage: '<@{{challenger}}> хэрэглэгч <@{{opponent}}> хэрэглэгчийг зодоонд дуудаж байна!',
            winMessage: 'ЭТО ГЭГЭ!, <@{{winner}}> хэрэглэгч хожлоо!',
            endMessage: '<@{{opponent}}> хэрэглэгч хариулт өгөөгүй тул цуцлагдлаа.',
            cancelMessage: '<@{{opponent}}> хэрэглэгч айгаад тулалдсангүй',
            fightMessage: '{{player}} хэрэглэгч та эхэл!',
            opponentsTurnMessage: 'Өрсөлдөгчөө хүлээнэ үү.',
            highHealthMessage: 'Таны цус 80с дээш байгаа бол өөрийгөө эдгээх боломжгүй!',
            lowHealthMessage: 'Таны цус 50с доош байгаа бол зодооныг дуусгах боломжгүй!',
            returnWinner: false,
            othersMessage: '{{author}} хэрэглэгчээс бусад зодоонд оролцох боломжгүй!'
        });
    }
}