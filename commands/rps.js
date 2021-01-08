const discord = require('discord.js')
module.exports = {
	name: "rps",
	description: "play a game of rock, paper and scissors",
	async execute(message, args) {
		let embed = new discord.MessageEmbed()
		.setTitle("Хайч, Чулуу, Даавуу")
		.setDescription("Доорх эможи дээр дарж тоглоорой")
        .setColor('#679ad8')
		let msg = await message.channel.send(embed)
		await msg.react("🗻")
		await msg.react("✂")
		await msg.react("📰")

		const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new discord.MessageEmbed()
        		.setTitle("Үзүүлэлт")
        		.addField("Таны гаргасан", `${reaction.emoji.name}`)
        		.addField("Миний гаргасан", `${me}`)
			await msg.edit(result)
        		if ((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "📰" && reaction.emoji.name === "🗻") ||
                (me === "✂" && reaction.emoji.name === "📰")) {
                    message.reply("Та хожигдлоо");
            } else if (me === reaction.emoji.name) {
                return message.reply("Тэнцлээ");
            } else {
                return message.reply("Та хожлоо");
            }
        })
        .catch(collected => {
                message.reply('Цуцлагдлаа');
            })
}
}