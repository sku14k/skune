const { Client, Message, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'info',
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
            .setDescription(`\`\`\`${prefix}info [Команд]\nЖишээ: ${prefix}info 8b\`\`\``)

        if (!args[0]) return await message.channel.send({ embeds: [helpEmbed] })
        if (args[0].toLowerCase() === '8b') {
            const bEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`8b команд: Та хүссэн зүйлээ асууж randomоор таньд хариулт өгөх үүрэгтэй.\nХэрэглээ: ${prefix}8b [Асуулт]\`\`\``)
            return message.channel.send({ embeds: [bEmbed] })
        }
        if (args[0].toLowerCase() === 'aar') {
            const aarEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`aar команд: Серверт шинээр хэрэглэгч ороход автоматаар role өгөх үүрэгтэй.\nХэрэглээ: ${prefix}aar [Role]\`\`\``)
            return message.channel.send({ embeds: [aarEmbed] })
        }
        if (args[0].toLowerCase() === 'afk') {
            const afkEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`afk команд: Away from keyboard гэдэг үгний товчлол буюу таныг хэсэг хугацаанд онлайн байх боломжгүйг мэдэгдэх үүрэгтэй.\nХэрэглээ: ${prefix}afk [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [afk] })
        }
        if (args[0].toLowerCase() === 'announce') {
            const announceEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`announce команд: Botоор ямар нэгэн текст сувагт зарлал бичүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}announce [#Текст Суваг] [Мессеж] [-ping]\`\`\``)
            return message.channel.send({ embeds: [announceEmbed] })
        }
        if (args[0].toLowerCase() === 'ascii') {
            const asciiEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ascii команд: Botоор ascii текст бичүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}ascii [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [asciiEmbed] })
        }
        if (args[0].toLowerCase() === 'avatar') {
            const avatarEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`avatar команд: Өөрийн эсвэл хэрэглэгчийн avatarыг харах үүрэгтэй.\nХэрэглээ: ${prefix}avatar\n${prefix}avatar [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [avatarEmbed] })
        }
        if (args[0].toLowerCase() === 'back') {
            const backEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`back команд: Өмнөх тоглосон дууг тоглуулах үүрэгтэй.\nХэрэглээ: ${prefix}back\`\`\``)
            return message.channel.send({ embeds: [backEmbed] })
        }
        if (args[0].toLowerCase() === 'ban') {
            const banEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ban команд: Хэрэглэгчийг серверээс ban хийх үүрэгтэй.\nХэрэглээ: ${prefix}ban [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [banEmbed] })
        }
        if (args[0].toLowerCase() === 'bans') {
            const bansEmbed = new MessageEmbed()
                .setColor('#679ad')
                .setDescription(`\`\`\`bans команд: Серверээс banдуулсан хэрэглэгчдийг харах үүрэгтэй.\nХэрэглээ: ${prefix}bans\`\`\``)
            return message.channel.send({ embeds: [bansEmbed] })
        }
        if (args[0].toLowerCase() === 'cc') {
            const ccEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`cc команд: Шинэ текст суваг үүсгэх үүрэгтэй.\nХэрэглээ: ${prefix}cc [Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [ccEmbed] })
        }
        if (args[0].toLowerCase() === 'cf') {
            const cfEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`cf команд: Зоос шидэх үүрэгтэй.\nХэрэглээ: ${prefix}cf\`\`\``)
            return message.channel.send({ embeds: [cfEmbed] })
        }
        if (args[0].toLowerCase() === 'clear') {
            const clearEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`clear команд: Тоглуулах жагсаалтыг арилгах үүрэгтэй.\nХэрэглээ: ${prefix}clear\`\`\``)
            return message.channel.send({ embeds: [clearEmbed] })
        }
        if (args[0].toLowerCase() === 'covid') {
            const covidEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`covid команд: Дэлхийн эсвэл улсын корона вирусын мэдээлэл авах үүрэгтэй.\nХэрэглээ: ${prefix}covid\n${prefix}covid [Улс]\`\`\``)
            return message.channel.send({ embeds: [covidEmbed] })
        }
        if (args[0].toLowerCase() === 'dc') {
            const dcEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`dc команд: Текст суваг устгах үүрэгтэй.\nХэрэглээ: ${prefix}dc\n${prefix}dc [#Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [dcEmbed] })
        }
        if (args[0].toLowerCase() === 'edit') {
            const editEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`edit команд: Botын мессежийг өөрчлөх үүрэгтэй.\nХэрэглээ: ${prefix}edit [Bot Мессеж ID] [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [edit] })
        }
        if (args[0].toLowerCase() === 'emojify') {
            const emojifyEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`emojify команд: Botоор эможи үсгэн текст бичүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}emojify [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [emojifyEmbed] })
        }
        if (args[0].toLowerCase() === 'help') {
            const helpEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`help команд: Botын талаар тусламж авах үүрэгтэй.\nХэрэглээ: ${prefix}help\`\`\``)
            return message.channel.send({ embeds: [helpEmbed] })
        }
        if (args[0].toLowerCase() === 'howgay') {
            const howgayEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`howgay команд: Өөрийн эсвэл хэрэглэгчийн хэр гомо вэ гэдгийг харах үүрэгтэй.\nХэрэглээ: ${prefix}howgay\n${prefix}howgay [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [howgayEmbed] })
        }
        if (args[0].toLowerCase() === 'info') {
            const infoEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`info команд: Командын талаар мэдээлэл, тусламж авах үүрэгтэй.\nХэрэглээ: ${prefix}info [Команд]\`\`\``)
            return message.channel.send({ embeds: [infoEmbed] })
        }
        if (args[0].toLowerCase() === 'invite') {
            const inviteEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`invite команд: Bot сервертээ нэмэх link авах үүрэгтэй.\nХэрэглээ: ${prefix}invite\`\`\``)
            return message.channel.send({ embeds: [inviteEmbed] })
        }
        if (args[0].toLowerCase() === 'kick') {
            const kickEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`kick команд: Серверээс хэрэглэгч гаргах үүрэгтэй.\nХэрэглээ: ${prefix}kick [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [kickEmbed] })
        }
        if (args[0].toLowerCase() === 'lock') {
            const lockEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`lock команд: Текст сувгийг цоожлох үүрэгтэй.\nХэрэглээ: ${prefix}lock\n${prefix}lock [#Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [lockEmbed] })
        }
        if (args[0].toLowerCase() === 'loop') {
            const loopEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`loop команд: Тоглож буй дууг эсвэл тоглуулах жагсаалтыг давтах үүрэгтэй.\nХэрэглээ: ${prefix}loop\n${prefix}loop queue\`\`\``)
            return message.channel.send({ embeds: [loopEmbed] })
        }
        if (args[0].toLowerCase() === 'meme') {
            const memeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`meme команд: Текст сувагт meme хуваалцах үүрэгтэй.\nХэрэглээ: ${prefix}meme\`\`\``)
            return message.channel.send({ embeds: [memeEmbed] })
        }
        if (args[0].toLowerCase() === 'mute') {
            const muteEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`mute команд: Хэрэглэгчийг mute хийх үүрэгтэй.\nХэрэглээ: ${prefix}mute [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [muteEmbed] })
        }
        if (args[0].toLowerCase() === 'np') {
            const npEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`np команд: Тоглож буй дууг харах үүрэгтэй.\nХэрэглээ: ${prefix}np\`\`\``)
            return message.channel.send({ embeds: [npEmbed] })
        }
        if (args[0].toLowerCase() === 'pause') {
            const pauseEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`pause команд: Тоглож буй дууг түр зогсоох үүрэгтэй.\nХэрэглээ: ${prefix}pause\`\`\``)
            return message.channel.send({ embeds: [pauseEmbed] })
        }
        if (args[0].toLowerCase() === 'play') {
            const playEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`play команд: Дуу тоглуулах үүрэгтэй.\nХэрэглээ: ${prefix}play [Дуу]\`\`\``)
            return message.channel.send({ embeds: [playEmbed] })
        }
        if (args[0].toLowerCase() === 'prefix') {
            const prefixEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`prefix команд: Командын угтвар тэмдэг харах үүрэгтэй.\nХэрэглээ: skuneprefix\`\`\``)
            return message.channel.send({ embeds: [prefixEmbed] })
        }
        if (args[0].toLowerCase() === 'purge') {
            const purgeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`purge команд: Текст сувгаас мөр мессеж болон хэрэглэгчийн мессежүүдийг устгах үүрэгтэй.\nХэрэглээ: ${prefix}purge [Мөр Мессежийн Хэмжээ]\n${prefix}purge [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [purgeEmbed] })
        }
        if (args[0].toLowerCase() === 'queue') {
            const queueEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`queue команд: Тоглуулах жагсаалтыг харах үүрэгтэй.\nХэрэглээ: ${prefix}queue\`\`\``)
            return message.channel.send({ embeds: [queueEmbed] })
        }
        if (args[0].toLowerCase() === 'rar') {
            const rarEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rar команд: Серверт шинэ хэрэглэгч ороход автоматаар өгөх roleг болиулах үүрэгтэй.\nХэрэглээ: ${prefix}rar\`\`\``)
            return message.channel.send({ embeds: [rarEmbed] })
        }
        if (args[0].toLowerCase() === 'react') {
            const reactEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`react команд: Botоор мессежд react даруулах үүрэгтэй.\nХэрэглээ: ${prefix}react [Мессеж ID] [Эможи]\`\`\``)
            return message.channel.send({ embeds: [reactEmbed] })
        }
        if (args[0].toLowerCase() === 'resume') {
            const resumeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`resume команд: Түр зогсоосон дууг үргэлжлүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}resume\`\`\``)
            return message.channel.send({ embeds: [resumeEmbed] })
        }
        if (args[0].toLowerCase() === 'rn') {
            const rnEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rn команд: Өөрийн эсвэл хэрэглэгчийн nicknameг арилгах үүрэгтэй.\nХэрэглээ: ${prefix}rn\n${prefix}rn [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [rnEmbed] })
        }
        if (args[0].toLowerCase() === 'rps') {
            const rpsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rps команд: Хэрэглэгчтэй хайч чулуу даавуу тоглох үүрэгтэй.\nХэрэглээ: ${prefix}rps [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [rpsEmbed] })
        }
        if (args[0].toLowerCase() === 'rr') {
            const rrEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rr команд: Хэрэглэгчд олгосон roleг хураах үүрэгтэй.\nХэрэглээ: ${prefix}rr [@Хэрэглэгч] [Role]\`\`\``)
            return message.channel.send({ embeds: [rrEmbed] })
        }
        if (args[0].toLowerCase() === 'rs') {
            const rsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rs команд: Текст сувгийн slowmodeг унтраах үүрэгтэй.\nХэрэглээ: ${prefix}rs\n${prefix}rs [#Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [rsEmbed] })
        }
        if (args[0].toLowerCase() === 'rwarn') {
            const rwarnEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rwarn команд: Хэрэглэгчийн анхааруулгыг арилгах үүрэгтэй.\nХэрэглээ: ${prefix}rwarn [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [rwarnEmbed] })
        }
        if (args[0].toLowerCase() === 'save') {
            const saveEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`save команд: Тоглож буй дууг хадгалах үүрэгтэй.\nХэрэглээ: ${prefix}save\`\`\``)
            return message.channel.send({ embeds: [saveEmbed] })
        }
        if (args[0].toLowerCase() === 'say') {
            const sayEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`say команд: Botоор текст сувагт мессеж бичүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}say [Мессеж]\n${prefix}say embed [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [sayEmbed] })
        }
        if (args[0].toLowerCase() === 'search') {
            const searchEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`search команд: Дуу хайх үүрэгтэй.\nХэрэглээ: ${prefix}search [Дуу]\`\`\``)
            return message.channel.send({ embeds: [searchEmbed] })
        }
        if (args[0].toLowerCase() === 'serverinfo') {
            const serverInfo = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`serverinfo команд: Серверийн мэдээллийг харах үүрэгтэй.\nХэрэглээ: ${prefix}serverinfo\`\`\``)
            return message.channel.send({ embeds: [serverInfo] })
        }
        if (args[0].toLowerCase() === 'setprefix') {
            const setPrefix = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`setprefix команд: Командын угтвар тэмдгийг өөрчлөх үүрэгтэй.\nХэрэглээ: ${prefix}setprefix [Командын Угтвар Тэмдэг]\`\`\``)
            return message.channel.send({ embeds: [setPrefix] })
        }
        if (args[0].toLowerCase() === 'skip') {
            const skipEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`skip команд: Тоглож буй дууг алгасах үүрэгтэй.\nХэрэглээ: ${prefix}skip\`\`\``)
            return message.channel.send({ embeds: [skipEmbed] })
        }
        if (args[0].toLowerCase() === 'sn') {
            const snEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`sn команд: Өөрийн эсвэл хэрэглэгчийн nicknameг өөрчлөх үүрэгтэй.\nХэрэглээ: ${prefix}sn [Nickname]\n${prefix}sn [@Хэрэглэгч] [Nickname]\`\`\``)
            return message.channel.send({ embeds: [snEmbed] })
        }
        if (args[0].toLowerCase() === 'sr') {
            const srEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`sr команд: Хэрэглэгчд role олгох үүрэгтэй.\nХэрэглээ: ${prefix}sr [@Хэрэглэгч] [Role]\`\`\``)
            return message.channel.send({ embeds: [srEmbed] })
        }
        if (args[0].toLowerCase() === 'ss') {
            const ssEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ss команд: Текст сувгийн slowmodeг асаах үүрэгтэй.\nХэрэглээ: ${prefix}ss [Хугацаа 30s = 30 секунд]\n${prefix}ss [#Текст Суваг] [Хугацаа 30s = 30 секунд]\`\`\``)
            return message.channel.send({ embeds: [ssEmbed] })
        }
        if (args[0].toLowerCase() === 'stats') {
            const statsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`stats команд: Botын мэдээллийг харах үүрэгтэй.\nХэрэглээ: ${prefix}stats\`\`\``)
            return message.channel.send({ embeds: [statsEmbed] })
        }
        if (args[0].toLowerCase() === 'stop') {
            const stopEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`stop команд: Тоглож буй дууг зогсоох үүрэгтэй.\nХэрэглээ: ${prefix}stop\`\`\``)
            return message.channel.send({ embeds: [stopEmbed] })
        }
        if (args[0].toLowerCase() === 'suggest') {
            const suggestEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`suggest команд: Санал хүсэлт илгээх үүрэгтэй.\nХэрэглээ: ${prefix}suggest [Санал Хүсэлт]\`\`\``)
            return message.channel.send({ embeds: [suggestEmbed] })
        }
        if (args[0].toLowerCase() === 'tmute') {
            const tmuteEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`tmute команд: Хэрэглэгчийг түр mute хийх үүрэгтэй.\nХэрэглээ: ${prefix}tmute [@Хэрэглэгч] [Хугацаа 30s = 30 секунд]\`\`\``)
            return message.channel.send({ embeds: [tmuteEmbed] })
        }
        if (args[0].toLowerCase() === 'translate') {
            const translateEmbed = new MessageEmbed()
                .setColor('#679ad')
                .setDescription(`\`\`\`translate команд: Үг орчуулах үүрэгтэй.\nХэрэглээ: ${prefix}translate [Орчуулах Үг]\`\`\``)
            return message.channel.send({ embeds: [translateEmbed] })
        }
        if (args[0].toLowerCase() === 'ttt') {
            const tttEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ttt команд: Хэрэглэгчтэй tic tac toe тоглох үүрэгтэй.\nХэрэглээ: ${prefix}ttt [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [tttEmbed] })
        }
        if (args[0].toLowerCase() === 'unban') {
            const unbanEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`unban команд: Серверээс banдуулсан хэрэглэгчийн banг гаргах үүрэгтэй.\nХэрэглээ: ${prefix}unban [Хэрлэгчийн ID]\`\`\``)
            return message.channel.send({ embeds: [unbanEmbed] })
        }
        if (args[0].toLowerCase() === 'unlock') {
            const unlockEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`unlock команд: Текст сувгийн цоожийг тайлах үүрэгтэй.\nХэрэглээ: ${prefix}unlock\n${prefix}unlock [#Текст Суваг]\`\`\``)
            return message.channel.send({ embeds: [unlockEmbed] })
        }
        if (args[0].toLowerCase() === 'unmute') {
            const unmuteEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`unmute команд: Хэрэглэгчийн muteг гаргах үүрэгтэй.\nХэрэглээ: ${prefix}unmute [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [unmuteEmbed] })
        }
        if (args[0].toLowerCase() === 'userinfo') {
            const userInfo = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`userinfo команд: Өөрийн эсвэл хэрэглэгчийн мэдээллийг харах үүрэгтэй.\nХэрэглээ: ${prefix}userinfo\n${prefix}userinfo [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [userInfo] })
        }
        if (args[0].toLowerCase() === 'volume') {
            const volumeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`volume команд: Тоглож буй дууны түвшинг тохируулах үүрэгтэй.\nХэрэглээ: ${prefix}volume [Дууны Түвшин]\`\`\``)
            return message.channel.send({ embeds: [volumeEmbed] })
        }
        if (args[0].toLowerCase() === 'warn') {
            const warnEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`warn команд: Хэрэлэгчд анхааруулга өгөх үүрэгтэй.\nХэрэглээ: ${prefix}warn [@Хэрэглэгч] [Шалтгаан]\`\`\``)
            return message.channel.send({ embeds: [warnEmbed] })
        }
        if (args[0].toLowerCase() === 'warns') {
            const warnsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`warns команд: Өөрийн эсвэл хэрэглэгчийн анхааруулгыг харах үүрэгтэй.\nХэрэглээ: ${prefix}warns\n${prefix}warns [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [warnsEmbed] })
        }
        if (args[0].toLowerCase() === 'weather') {
            const weatherEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`weather команд: Хотын цаг агаарыг харах үүрэгтэй.\nХэрэглээ: ${prefix}weather [Хот]\`\`\``)
            return message.channel.send({ embeds: [weatherEmbed] })
        }
        if (args[0].toLowerCase() === 'abal') {
            const abalEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`abal команд: Хэрэглэгчд skune зоос нэмэх үүрэгтэй.\nХэрэглээ: ${prefix}abal [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [abalEmbed] })
        }
        if (args[0].toLowerCase() === 'bal') {
            const balEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`bal команд: Өөрийн эсвэл хэрэглэгчийн skune зоосын үлдэгдлийг шалгах үүрэгтэй.\nХэрэглээ: ${prefix}bal\n${prefix}bal [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [balEmbed] })
        }
        if (args[0].toLowerCase() === 'baltop') {
            const baltopEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`baltop команд: Skune зоосоор тэргүүлэгчдийн самбарыг харах үүрэгтэй.\nХэрэглээ: ${prefix}baltop\`\`\``)
            return message.channel.send({ embeds: [baltopEmbed] })
        }
        if (args[0].toLowerCase() === 'daily') {
            const dailyEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`daily команд: Өдөр бүр skune зоосыг цуглуулах үүрэгтэй.\nХэрэглээ: ${prefix}daily\`\`\``)
            return message.channel.send({ embeds: [dailyEmbed] })
        }
        if (args[0].toLowerCase() === 'dep') {
            const depEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`dep команд: Банканд skune зоосоо хадгалах үүрэгтэй.\nХэрэглээ: ${prefix}dep all\n${prefix}dep [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [depEmbed] })
        }
        if (args[0].toLowerCase() === 'give') {
            const giveEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`give команд: Хэрэглэгчрүү skune зоосоо шилжүүлэх үүрэгтэй.\nХэрэглээ: ${prefix}give [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [giveEmbed] })
        }
        if (args[0].toLowerCase() === 'rbal') {
            const rbalEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rbal команд: Хэрэглэгчээс skune зоос хураах үүрэгтэй.\nХэрэглээ: ${prefix}rbal [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [rbalEmbed] })
        }
        if (args[0].toLowerCase() === 'rob') {
            const robEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`rob команд: Хэрэглэгчээс skune зоос дээрэмдэх үүрэгтэй.\nХэрэглээ: ${prefix}rob [@Хэрэглэгч] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [robEmbed] })
        }
        if (args[0].toLowerCase() === 'roulette') {
            const rouletteEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`roulette команд: Roulette тоглох үүрэгтэй.\nХэрэглээ: ${prefix}roulette [Өнгө red, black, green] [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [rouletteEmbed] })
        }
        if (args[0].toLowerCase() === 'slots') {
            const slotsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`slots команд: Slots тоглох үүрэгтэй.\nХэрэглээ: ${prefix}slots [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [slotsEmbed] })
        }
        if (args[0].toLowerCase() === 'with') {
            const withEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`with команд: Банканд хадгалуулсан skune зоосоо авах үүрэгтэй.\nХэрэглээ: ${prefix}with all\n${prefix}with [Skune Зоосны Хэмжээ]\`\`\``)
            return message.channel.send({ embeds: [withEmbed] })
        }
        if (args[0].toLowerCase() === 'c4') {
            const c4Embed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`c4 команд: Connect 4 тоглох үүрэгтэй.\nХэрэглээ: ${prefix}c4 [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [c4Embed] })
        }
        if (args[0].toLowerCase() === 'ctf') {
            const ctfEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ctf команд: Загас барих тоглох үүрэгтэй.\nХэрэглээ: ${prefix}ctf\`\`\``)
            return message.channel.send({ embeds: [ctfEmbed] })
        }
        if (args[0].toLowerCase() === 'fb') {
            const fbEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`fb команд: Хөл бөмбөг тоглох үүрэгтэй.\nХэрэглээ: ${prefix}fb\`\`\``)
            return message.channel.send({ embeds: [fbEmbed] })
        }
        if (args[0].toLowerCase() === 'fight') {
            const fightEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`fight команд: Зодоон хийх үүрэгтэй.\nХэрэглээ: ${prefix}fight [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [fightEmbed] })
        }
        if (args[0].toLowerCase() === 'gf') {
            const gfEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`gf команд: Gunfight тоглох үүрэгтэй.\nХэрэглээ: ${prefix}gf [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [gfEmbed] })
        }
        if (args[0].toLowerCase() === 'google') {
            const googleEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`google команд: Googleдэх үүрэгтэй.\nХэрэглээ: ${prefix}google [Хайх Зүйл]\`\`\``)
            return message.channel.send({ embeds: [googleEmbed] })
        }
        if (args[0].toLowerCase() === 'qc') {
            const qcEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`qc команд: Хурдан дарах тоглох үүрэгтэй.\nХэрэглээ: ${prefix}qc\`\`\``)
            return message.channel.send({ embeds: [qcEmbed] })
        }
        if (args[0].toLowerCase() === 'wasted') {
            const wastedEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`wasted команд: Wasted харуулах үүрэгтэй.\nХэрэглээ: ${prefix}wasted [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [wastedEmbed] })
        }
        if (args[0].toLowerCase() === 'wideavatar') {
            const wideavatarEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`wideavatar команд: Wideavatar харах үүрэгтэй.\nХэрэглээ: ${prefix}wideavatar\n${prefix}wideavatar [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [wideavatarEmbed] })
        }
        if (args[0].toLowerCase() === 'wiki') {
            const wikiEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`wiki команд: Wikipediaдах үүрэгтэй.\nХэрэглээ: ${prefix}wiki [Хайх зүйл]\`\`\``)
            return message.channel.send({ embeds: [wikiEmbed] })
        }
        if (args[0].toLowerCase() === 'trigger') {
            const triggerEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`trigger команд: Trigger харуулах үүрэгтэй.\nХэрэглээ: ${prefix}trigger [@Хэрэглэгч]\`\`\``)
            return message.channel.send({ embeds: [triggerEmbed] })
        }
        if (args[0].toLowerCase() === 'beg') {
            const begEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`beg команд: Skune хотын гудамд skune зоос гуйх үүрэгтэй.\nХэрэглээ: ${prefix}beg\`\`\``)
            return message.channel.send({ embeds: [begEmbed] })
        }
        if (args[0].toLowerCase() === 'work') {
            const workEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`work команд: Ажил хийж skune зоос цуглуулах үүрэгтэй.\nХэрэглээ: ${prefix}work\`\`\``)
            return message.channel.send({ embeds: [workEmbed] })
        }
        if (args[0].toLowerCase() === 'ri') {
            const riEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ri команд: Roleийн мэдээлэл харах үүрэгтэй.\nХэрэглээ: ${prefix}ri [Role ID]\n${prefix}ri [Role]\`\`\``)
            return message.channel.send({ embeds: [riEmbed] })
        }
        if (args[0].toLowerCase() === 'dm') {
            const dmEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`dm команд: Хэрэглэгчрүү DM явуулах үүрэгтэй.\nХэрэглээ: ${prefix}dm [Хэрэглэгчийн ID] [Мессеж]\`\`\``)
            return message.channel.send({ embeds: [dmEmbed] })
        }
        if (args[0].toLowerCase() === 'ga') {
            const gaEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`ga команд: Giveaway зарлах үүрэгтэй.\nХэрэглээ: ${prefix}ga [Хугацаа 1m = 1 минут] [#Текст Суваг] [Шагнал]\`\`\``)
            return message.channel.send({ embeds: [gaEmbed] })
        }
        if (args[0].toLowerCase() === 'lyrics') {
            const lyricsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`lyrics команд: Дууны үг харах үүрэгтэй.\nХэрэглээ: ${prefix}lyrics [Дууны Нэр]]\`\`\``)
            return message.channel.send({ embeds: [lyricsEmbed] })
        }
    }
}