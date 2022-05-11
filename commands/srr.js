const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ReactionRole = require("discordjs-reaction-role").default;

module.exports = {
    name: 'srr',
    async execute(client, message, args) {
        const msgID = await message.channel.messages.fetch(args[0])
        const reaction = args.slice(1).join(' ')
        const reactionRole = message.guild.roles.cache.find((r) => r.name === args.slice(2).join(' '))

        const rr = new ReactionRole(client, [
            { messageId: "943364979862700116", reaction: "👍", roleId: "938142966244052992" },
        ]);
    }
}