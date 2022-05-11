const { Client, Message, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('quick.db')
const paginationEmbed = require('discordjs-button-pagination')
const fs = require('fs');
const length = fs.readdirSync('./commands').length - 1

module.exports = {
    name: 'commands',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }
        let files = `${client.commands.map(element => element.name).join(', ')}`
        let commandsEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`${files}\n\nНийт ${length} команд байна.\`\`\``)
        message.channel.send({ embeds: [commandsEmbed] })
    }
}