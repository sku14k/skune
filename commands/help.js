const { MessageEmbed, MessageButton } = require('discord.js')
const db = require('quick.db')
const paginationEmbed = require('discordjs-button-pagination')
module.exports = {
    name: 'help',
    async execute(client, message, args) {
        let prefix
        let prefixes = await db.fetch(`prefix_${message.guild.id}`)
        if (prefixes == null) {
            prefix = 'skune'
        } else {
            prefix = prefixes
        }
        const helpEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .addFields(
                { name: 'Серверийн зохицуулалтын командуудыг харах', value: `\`\`\`${prefix}help moderation\`\`\``, inline: true },
                { name: 'Economy командуудыг харах', value: `\`\`\`${prefix}help economy\`\`\``, inline: true },
                { name: 'Дууны командуудыг харах', value: `\`\`\`${prefix}help music\`\`\``, inline: true },
                { name: 'Fun командуудыг харах', value: `\`\`\`${prefix}help fun\`\`\``, inline: true },
                { name: 'Тоглоомны командуудыг харах', value: `\`\`\`${prefix}help games\`\`\``, inline: true },
                { name: 'Нэмэлт командуудыг харах', value: `\`\`\`${prefix}help extras\`\`\``, inline: true },
                { name: 'Бүх командуудыг харах', value: `\`\`\`${prefix}commands\`\`\``, inline: true },
                { name: 'Командын мэдээлэллийг харах', value: `\`\`\`${prefix}info [Команд]\`\`\``, inline: true },
                { name: 'Нийгмийн холбоосуудыг харах', value: `\`\`\`${prefix}social\`\`\``, inline: true },
                { name: 'Ботын статистикийг харах', value: `\`\`\`${prefix}stats\`\`\``, inline: true },
                { name: 'Санал хүсэлт илгээх', value: `\`\`\`${prefix}suggest [Санал Хүсэлт]\`\`\``, inline: false },
                { name: 'Командын угтвар тэмдэг харах', value: `\`\`\`skuneprefix\`\`\``, inline: false },
                { name: 'Командын угтвар тэмдэг солих', value: `\`\`\`${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``, inline: false },
            )
        if (!args[0]) return await message.channel.send({ embeds: [helpEmbed] })
        if (args[0].toLowerCase() === 'moderation') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Хэрэглэгчийг серверээс гаргах',
                        value: `\`\`\`${prefix}kick [@Хэрэглэгч] [Шалтгаан]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчийг серверээс mute хийх',
                        value: `\`\`\`${prefix}mute [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчийг серверээс түр mute хийх',
                        value: `\`\`\`${prefix}tmute [@Хэрэглэгч] [Хугацаа 30s = 30 секунд]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчийн mute-ийг серверээс гаргах',
                        value: `\`\`\`${prefix}unmute [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчд role олгох',
                        value: `\`\`\`${prefix}sr [@Хэрэглэгч] [Role]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчээс role хураах',
                        value: `\`\`\`${prefix}rr [@Хэрэглэгч] [Role]\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Автомат role оноох',
                        value: `\`\`\`${prefix}aar [Role]\`\`\``,
                    },
                    {
                        name: 'Автомат role-ийг унтраах',
                        value: `\`\`\`${prefix}rar\`\`\``,
                    },
                    {
                        name: 'Өөртөө эсвэл хэрэглэгчд nickname өгөх',
                        value: `\`\`\`${prefix}sn [Хоч]\n${prefix}sn [@Хэрэглэгч] [Хоч]\`\`\``,
                    },
                    {
                        name: 'Өөрийн эсвэл хэрэглэгчийн nickname-ийг арилгах',
                        value: `\`\`\`${prefix}rn\n${prefix}rn [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчийг серверээс ban-дах',
                        value: `\`\`\`${prefix}ban [@Хэрэглэгч] [Шалтгаан]\`\`\``,
                    },
                    {
                        name: 'Серверээс ban-дуулсан хэрэглэгчдийг харах',
                        value: `\`\`\`${prefix}bans\`\`\``,
                    },
                )
            const pagethree = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Хэрэглэгчийн ban-г серверээс гаргах',
                        value: `\`\`\`${prefix}unban [Хэрэглэгчийн ID] [Шалтгаан]\`\`\``,
                    },
                    {
                        name: 'Ботоор мессеж бичүүлэх',
                        value: `\`\`\`${prefix}say [Мессеж]\n${prefix}say embed [Мессеж]\`\`\``,
                    },
                    {
                        name: 'Зарлал ботоор бичүүлэх',
                        value: `\`\`\`${prefix}announce [#Текст Суваг] [Мессеж] [-ping]\`\`\``,
                    },
                    {
                        name: 'Ботоор мессежд react даруулах',
                        value: `\`\`\`${prefix}react [Мессеж ID] [Эможи]\`\`\``,
                    },
                    {
                        name: 'Ботын мессежийг өөрчлөх',
                        value: `\`\`\`${prefix}edit [Bot Мессеж ID] [Мессеж]\n${prefix}edit [Bot Мессеж ID] embed [Мессеж]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийн эсвэл хэрэглэгчийн мөр мессеж устгах',
                        value: `\`\`\`${prefix}purge [Мөр Мессежийн Хэмжээ]\n${prefix}purge [@Хэрэглэгч]\`\`\``,
                    },
                )
            const pagefour = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Текст суваг үүсгэх',
                        value: `\`\`\`${prefix}cc [Текст Суваг]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийг устгах',
                        value: `\`\`\`${prefix}dc [#Текст Суваг]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийг цоожлох',
                        value: `\`\`\`${prefix}lock\n${prefix}lock [#Текст Суваг]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийн цоожийг тайлах',
                        value: `\`\`\`${prefix}unlock\n${prefix}unlock [#Текст Суваг]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийн slowmode-ийг асаах',
                        value: `\`\`\`${prefix}ss [Хугацаа 30s = 30 секунд]\n${prefix}ss [#Текст Суваг] [Хугацаа 30s = 30 секунд]\`\`\``,
                    },
                    {
                        name: 'Текст сувгийн slowmode-ийг унтраах',
                        value: `\`\`\`${prefix}rs\n${prefix}rs [#Текст Суваг]\`\`\``,
                    },
                )
            const pagefive = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Хэрэглэгчд анхааруулга өгөх',
                        value: `\`\`\`${prefix}warn [@Хэрэглэгч] [Шалтгаан]\`\`\``,
                    },
                    {
                        name: 'Өөрийн эсвэл хэрэглэгчийн анхааруулгыг харах',
                        value: `\`\`\`${prefix}warns\n${prefix}warns [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчийн анхааруулгыг арилгах',
                        value: `\`\`\`${prefix}rwarn [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Командын угтвар тэмдгийг харах',
                        value: `\`\`\`${prefix}skuneprefix\`\`\``
                    },
                    {
                        name: 'Командын угтвар тэмдэг солих',
                        value: `\`\`\`${prefix}setprefix [Командын Угтвар  Тэмдэг]\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
                pagethree,
                pagefour,
                pagefive,
            ]
            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
        if (args[0].toLowerCase() === 'extras') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Серверийн мэдээллийг харах',
                        value: `\`\`\`${prefix}serverinfo\`\`\``,
                    },
                    {
                        name: 'Өөрийн эсвэл хэрэглэгчийн мэдээллийг харах',
                        value: `\`\`\`${prefix}userinfo\n${prefix}userinfo [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Role-ийн мэдээлэл харах',
                        value: `\`\`\`${prefix}ri [Role ID]\n${prefix}ri [Role]\`\`\``,
                    },
                    {
                        name: 'Өөрийн эсвэл хэрэглэгчийн аватарыг харах',
                        value: `\`\`\`${prefix}avatar\n${prefix}avatar [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Giveaway зарлах',
                        value: `\`\`\`${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``
                    },
                    {
                        name: 'Хэрэглэгчрүү шууд мессеж явуулах',
                        value: `\`\`\`${prefix}dm [Хэрэглэгчийн ID] [Мессеж]\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Google-дэх',
                        value: `\`\`\`${prefix}google [Хайх Зүйл]\`\`\``,
                    },
                    {
                        name: 'Wikipedia-дах',
                        value: `\`\`\`${prefix}wiki [Хайх Зүйл]\`\`\``,
                    },
                    {
                        name: 'Орчуулах',
                        value: `\`\`\`${prefix}translate [Орчуулах Үг]\`\`\``,
                    },
                    {
                        name: 'Дэлхийн эсвэл улсын корона мэдээллийг харах',
                        value: `\`\`\`${prefix}covid\n${prefix}covid [Улс]\`\`\``,
                    },
                    {
                        name: 'Цаг агаар харах',
                        value: `\`\`\`${prefix}weather [Хот]\`\`\``,
                    },
                    {
                        name: 'AFK болох',
                        value: `\`\`\`${prefix}afk [Шалтгаан]\`\`\``,
                    },
                )
            const pagethree = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Ботын статистикийг харах',
                        value: `\`\`\`${prefix}stats\`\`\``,
                    },
                    {
                        name: 'Нийгмийн холбоосуудыг харах',
                        value: `\`\`\`${prefix}social\`\`\``,
                    },
                    {
                        name: 'Санал хүсэлт илгээх',
                        value: `\`\`\`${prefix}suggest [Санал Хүсэлт]\`\`\``,
                    },
                    {
                        name: 'Бүх командуудыг харах',
                        value: `\`\`\`${prefix}commands\`\`\``,
                    },
                    {
                        name: 'Командын мэдээллийг харах',
                        value: `\`\`\`${prefix}info [Команд]\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
                pagethree,
            ]
            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
        if (args[0].toLowerCase() === 'music') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Дуу тоглуулах',
                        value: `\`\`\`${prefix}play [Дууны Нэр]\`\`\``,
                    },
                    {
                        name: 'Дууг түр зогсоох',
                        value: `\`\`\`${prefix}pause\`\`\``,
                    },
                    {
                        name: 'Дууг үргэлжлүүлэх',
                        value: `\`\`\`${prefix}resume\`\`\``,
                    },
                    {
                        name: 'Дууг зогсоох',
                        value: `\`\`\`${prefix}stop\`\`\``,
                    },
                    {
                        name: 'Тоглох дууны жагсаалтыг харах',
                        value: `\`\`\`${prefix}queue\`\`\``,
                    },
                    {
                        name: 'Тоглох дууны жагсаалтыг арилгах',
                        value: `\`\`\`${prefix}clear\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Тоглож буй дууг алгасах',
                        value: `\`\`\`${prefix}skip\`\`\``,
                    },
                    {
                        name: 'Өмнөх дууг тоглуулах',
                        value: `\`\`\`${prefix}back\`\`\``,
                    },
                    {
                        name: 'Тоглож буй дууг харах',
                        value: `\`\`\`${prefix}np\`\`\``,
                    },
                    {
                        name: 'Тоглож буй дууг хадгалах',
                        value: `\`\`\`${prefix}save\`\`\``,
                    },
                    {
                        name: 'Тоглож буй дууг давтах',
                        value: `\`\`\`${prefix}loop\`\`\``,
                    },
                    {
                        name: 'Дууны түвшинг тохируулах',
                        value: `\`\`\`${prefix}volume [Дууны Түвшин]\`\`\``,
                    },
                )
            const pagethree = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Дуу хайх',
                        value: `\`\`\`${prefix}search [Дууны Нэр]\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
                pagethree,
            ]

            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
        if (args[0].toLowerCase() === 'economy') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Өөрийн болон хэрэглэгчийн skune зоосны үлдэгдлийг шалгах',
                        value: `\`\`\`${prefix}bal\n${prefix}bal [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Skune зоосоор тэргүүлэгчдийн самбар харах',
                        value: `\`\`\`${prefix}baltop\`\`\``,
                    },
                    {
                        name: 'Skune зоос өдөр бүр цуглуулах',
                        value: `\`\`\`${prefix}daily\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчээс skune зоос дээрэмдэх',
                        value: `\`\`\`${prefix}rob [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Банканд skune зоосоо хадгалах',
                        value: `\`\`\`${prefix}dep all\n${prefix}dep [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Банкнаас skune зоосоо авах',
                        value: `\`\`\`${prefix}with all\n${prefix}with [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Слот казино тоглох',
                        value: `\`\`\`${prefix}slots [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Рулет тоглох',
                        value: `\`\`\`${prefix}roulette [Өнгө red, black, green] [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчрүү skune зоос шилжүүлэх',
                        value: `\`\`\`${prefix}give [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчд skune зоос нэмэх',
                        value: `\`\`\`${prefix}abal [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Хэрэглэгчээс skune зоосыг хураах',
                        value: `\`\`\`${prefix}rbal [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``,
                    },
                    {
                        name: 'Ажил хийж skune зоос олох',
                        value: `\`\`\`${prefix}work\`\`\``,
                    },
                )
            const pagethree = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Skune зоос гуйх',
                        value: `\`\`\`${prefix}beg\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
                pagethree,
            ]

            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
        if (args[0].toLowerCase() === 'games') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Бууны тулаан тоглох',
                        value: `\`\`\`${prefix}gf [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Connect 4 тоглох',
                        value: `\`\`\`${prefix}c4 [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Загас барьж тоглох',
                        value: `\`\`\`${prefix}ctf\`\`\``,
                    },
                    {
                        name: 'Хөл бөмбөг тоглох',
                        value: `\`\`\`${prefix}fb\`\`\``,
                    },
                    {
                        name: 'Гудамжны зодоон тоглох',
                        value: `\`\`\`${prefix}fight [@Хэрэглэгч]\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Хурдан товших тоглох',
                        value: `\`\`\`${prefix}qc\`\`\``,
                    },
                    {
                        name: 'Хайч чулуу даавуу тоглох',
                        value: `\`\`\`${prefix}rps [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Tic Tac Toe тоглох',
                        value: `\`\`\`${prefix}ttt [@Хэрэглэгч]\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
            ]
            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
        if (args[0].toLowerCase() === 'fun') {
            const pageone = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Шидэт 8 бөмбөгөөс асуулт асуух',
                        value: `\`\`\`${prefix}8b [Асуулт]\`\`\``,
                    },
                    {
                        name: 'Emojify мессеж ботоор бичүүлэх',
                        value: `\`\`\`${prefix}emojify [Мессеж]\`\`\``,
                    },
                    {
                        name: 'Ascii мессеж ботоор бичүүлэх',
                        value: `\`\`\`${prefix}ascii [Мессеж]\`\`\``,
                    },
                    {
                        name: 'Мийм харах',
                        value: `\`\`\`${prefix}meme\`\`\``,
                    },
                    {
                        name: 'Trigger',
                        value: `\`\`\`${prefix}trigger [@Хэрэглэгч]\`\`\``,
                    },
                    {
                        name: 'Wasted',
                        value: `\`\`\`${prefix}wasted [@Хэрэглэгч]\`\`\``,
                    },
                )
            const pagetwo = new MessageEmbed()
                .setColor('#679ad8')
                .addFields(
                    {
                        name: 'Wideavatar',
                        value: `\`\`\`${prefix}wideavatar\n${prefix}wideavatar [@Хэрэглэгч]\`\`\``,
                    },
                )
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Өмнөх')
                .setStyle('SECONDARY')
            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Дараах')
                .setStyle('SECONDARY')
            pages = [
                pageone,
                pagetwo,
            ]
            buttonList = [
                button1,
                button2
            ]
            paginationEmbed(message, pages, buttonList)
        }
    }
}