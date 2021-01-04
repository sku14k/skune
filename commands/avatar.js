const Discord = require('discord.js');
 
module.exports = {
    name: 'avatar',
    description: 'returns a users avatar',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
 
        if(!message.mentions.users.first()){
            embed.setTitle("Таны хөрөг зураг 🖌")
            embed.setImage(message.author.displayAvatarURL())
            embed.setColor("#679ad8")
            embed.setFooter("© 2021. 14K")
            return message.channel.send(embed)
        }else{
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag} гишүүний хөрөг зураг 🖌`)
            embed.setImage(user.displayAvatarURL())
            embed.setColor('#679ad8')
            embed.setFooter("© 2021. 14K")
            return message.channel.send(embed)
        }
    }
}