const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'log',
    async execute(client, message, args) {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)

        if (prefix == null) {
            prefix = 'skune'
        } else {
            prefix = prefix
        }

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            const banError = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Танд log командыг ашиглах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [banError] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            const permsEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`Надад log командыг ажиллуулах permission байхгүй байна.\`\`\``)
            return message.channel.send({ embeds: [permsEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        }

        const LogChannel = message.mentions.channels.first() || message.channel
        const serverId = message.guild.id

        const channelEmbed = new MessageEmbed()
            .setColor('#679ad8')
            .setDescription(`\`\`\`Log текст суваг #${LogChannel.name} болж өөрчлөгдлөө.\`\`\``)
        message.channel.send({ embeds: [channelEmbed] })

        client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
            const TopicUpdate = new MessageEmbed()
                .setTitle('Topic Updated!')
                .setColor('#2F3136')
                .setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);

            return LogChannel.send({
                embeds: [TopicUpdate]
            });

        });

        client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
            const PermissionUpdate = new MessageEmbed()
                .setTitle('Permission Updated!')
                .setColor('#2F3136')
                .setDescription(`${channel.name}'s permissions updated!"`);

            return LogChannel.send({
                embeds: [PermissionUpdate]
            });

        })

        // unhandled Guild Channel Update
        client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {


            const unhandledGuildChannelUpdate = new MessageEmbed()
                .setTitle('Channel Updated!')
                .setColor('#2F3136')
                .setDescription("Channel '" + oldChannel.id + "' was edited but discord-logs couldn't find what was updated...");

            return LogChannel.send({
                embeds: [unhandledGuildChannelUpdate]
            });

        });

        // Member Started Boosting
        client.on("guildMemberBoost", (member) => {


            const MemberBoost = new MessageEmbed()
                .setTitle('User Started Boosting!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** has started boosting  ${member.guild.name}!`);
            return LogChannel.send({
                embeds: [MemberBoost]
            });

        })

        // Member Unboosted
        client.on("guildMemberUnboost", (member) => {


            const MemberUnboost = new MessageEmbed()
                .setTitle('User Stoped Boosting!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name}!`);

            return LogChannel.send({
                embeds: [MemberUnboost]
            });

        })

        // Member Got Role
        client.on("guildMemberRoleAdd", (member, role) => {


            const MemberRoleAdd = new MessageEmbed()
                .setTitle('User Got Role!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

            return LogChannel.send({
                embeds: [MemberRoleAdd]
            });

        })

        // Member Lost Role
        client.on("guildMemberRoleRemove", (member, role) => {


            const MemberRoleRemove = new MessageEmbed()
                .setTitle('User Lost Role!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);

            return LogChannel.send({
                embeds: [MemberRoleRemove]
            });

        })

        // Nickname Changed
        client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {


            const MemberNicknameUpdate = new MessageEmbed()
                .setTitle('Nickname Updated')
                .setColor('#2F3136')
                .setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

            return LogChannel.send({
                embeds: [MemberNicknameUpdate]
            });

        })

        // Member Joined
        client.on("guildMemberEntered", (member) => {


            const MemberJoined = new MessageEmbed()
                .setTitle('User Joined')
                .setColor('#2F3136')
                .setDescription(`${member.user.tag} Joined!`);

            return LogChannel.send({
                embeds: [MemberJoined]
            });

        })

        // Server Boost Level Up
        client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {


            const LevelUp = new MessageEmbed()
                .setTitle('Server Boost Level Up')
                .setColor('#2F3136')
                .setDescription(`${guild.name} reached the boost level ${newLevel}`);

            return LogChannel.send({
                embeds: [LevelUp]
            });

        })

        // Server Boost Level Down
        client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {


            const LevelDown = new MessageEmbed()
                .setTitle('Server Boost Level Down')
                .setColor('#2F3136')
                .setDescription(`${guild.name} lost a level from ${oldLevel} to ${newLevel}`);

            return LogChannel.send({
                embeds: [LevelDown]
            });

        })

        // Banner Added
        client.on("guildBannerAdd", (guild, bannerURL) => {


            const BannerAdd = new MessageEmbed()
                .setTitle('Server Got a new banner')
                .setColor('#2F3136')
                .setImage(bannerURL)

            return LogChannel.send({
                embeds: [BannerAdd]
            });

        })

        // AFK Channel Added
        client.on("guildAfkChannelAdd", (guild, afkChannel) => {


            const AFKAdd = new MessageEmbed()
                .setTitle('AFK Channel Added')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has a new afk channel ${afkChannel}`);

            return LogChannel.send({
                embeds: [AFKAdd]
            });

        })

        // Guild Vanity Add
        client.on("guildVanityURLAdd", (guild, vanityURL) => {


            const VanityAdd = new MessageEmbed()
                .setTitle('Vanity Link Added')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has a vanity link ${vanityURL}`);

            return LogChannel.send({
                embeds: [VanityAdd]
            });

        })

        // Guild Vanity Remove
        client.on("guildVanityURLRemove", (guild, vanityURL) => {


            const VanityRemove = new MessageEmbed()
                .setTitle('Vanity Link Removed')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has removed its vanity URL ${vanityURL}`);

            return LogChannel.send({
                embeds: [VanityRemove]
            });

        })

        // Guild Vanity Link Updated
        client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {


            const VanityUpdated = new MessageEmbed()
                .setTitle('Vanity Link Updated')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has changed its vanity URL from ${oldVanityURL} to ${newVanityURL}!`);

            return LogChannel.send({
                embeds: [VanityUpdated]
            });

        })

        // Message Pinned
        client.on("messagePinned", (message) => {


            const MessagePinned = new MessageEmbed()
                .setTitle('Message Pinned')
                .setColor('#2F3136')
                .setDescription("This message has been pinned : " + message);

            return LogChannel.send({
                embeds: [MessagePinned]
            });

        })

        // Message Edited
        client.on("messageContentEdited", (message, oldContent, newContent) => {


            const MessageEdited = new MessageEmbed()
                .setTitle('Message Edited')
                .setColor('#2F3136')
                .setDescription(`Message Edited from \`${oldContent}\` to \`${newContent}\``);

            return LogChannel.send({
                embeds: [MessageEdited]
            });

        })

        // Member Became Offline
        client.on("guildMemberOffline", (member, oldStatus) => {


            const MemberOffline = new MessageEmbed()
                .setTitle('Message Offline')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became offline!");

            return LogChannel.send({
                embeds: [MemberOffline]
            });

        })

        // Member Became Online
        client.on("guildMemberOnline", (member, newStatus) => {


            const MemberOnline = new MessageEmbed()
                .setTitle('Message Online')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " was offline and is now " + newStatus + "!");

            return LogChannel.send({
                embeds: [MemberOnline]
            });

        })

        // Role Position Updated
        client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {


            const RolePositionUpdated = new MessageEmbed()
                .setTitle('Role Position Updated')
                .setColor('#2F3136')
                .setDescription(role.name + " role was at position " + oldPosition + " and now is at position " + newPosition);

            return LogChannel.send({
                embeds: [RolePositionUpdated]
            });

        })

        // Role Permission Updated
        client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {


            const RolePermissionUpdated = new MessageEmbed()
                .setTitle('Role Permission Updated')
                .setColor('#2F3136')
                .setDescription(role.name + " had as permissions " + oldPermissions + " and now has as permissions " + newPermissions);

            return LogChannel.send({
                embeds: [RolePermissionUpdated]
            });

        })

        // Avatar Updated
        client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {


            const AvatarUpdated = new MessageEmbed()
                .setTitle('Avatar Updated')
                .setColor('#2F3136')
                .setDescription(`${user.tag} updated avatar from [Old Avatar](${oldAvatarURL}) to [New Avatar(${newAvatarURL})]`);

            return LogChannel.send({
                embeds: [AvatarUpdated]
            });

        })

        // Username Updated
        client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {


            const Username = new MessageEmbed()
                .setTitle('Username Updated')
                .setColor('#2F3136')
                .setDescription(`${user.tag} updated thier username from ${oldUsername} to ${newUsername}`);

            return LogChannel.send({
                embeds: [Username]
            });

        })

        // Discriminator Updated
        client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {


            const Discriminator = new MessageEmbed()
                .setTitle('Discriminator Updated')
                .setColor('#2F3136')
                .setDescription(`${user.tag} updated thier discriminator from ${oldDiscriminator} to ${oldDiscriminator}`);

            return LogChannel.send({
                embeds: [Discriminator]
            });

        })

        // Flags Updated
        client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {


            const FlagsUpdate = new MessageEmbed()
                .setTitle('Flags Updated')
                .setColor('#2F3136')
                .setDescription(`${user.tag} updated thier flags from ${oldFlags} to ${newFlags}`);

            return LogChannel.send({
                embeds: [FlagsUpdate]
            });

        })

        // Joined VC
        client.on("voiceChannelJoin", (member, channel) => {


            const VCJoined = new MessageEmbed()
                .setTitle('Voice Channel Joined')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " joined " + `${channel}` + "!");

            return LogChannel.send({
                embeds: [VCJoined]
            });

        })

        // Left VC
        client.on("voiceChannelLeave", (member, channel) => {


            const VCLeft = new MessageEmbed()
                .setTitle('Voice Channel Left')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " left " + `${channel}` + "!");

            return LogChannel.send({
                embeds: [VCLeft]
            });

        })

        // VC Switch
        client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {


            const VCSwitch = new MessageEmbed()
                .setTitle('Voice Channel Switched')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

            return LogChannel.send({
                embeds: [VCSwitch]
            });

        })

        // VC Mute
        client.on("voiceChannelMute", (member, muteType) => {


            const VCMute = new MessageEmbed()
                .setTitle('User Muted')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became muted! (type: " + muteType + ")");

            return LogChannel.send({
                embeds: [VCMute]
            });

        })

        // VC Unmute
        client.on("voiceChannelUnmute", (member, oldMuteType) => {


            const VCUnmute = new MessageEmbed()
                .setTitle('User Unmuted')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became unmuted!");

            return LogChannel.send({
                embeds: [VCUnmute]
            });

        })

        // VC Defean
        client.on("voiceChannelDeaf", (member, deafType) => {


            const VCDeafen = new MessageEmbed()
                .setTitle('User Deafend')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " become deafed!");

            return LogChannel.send({
                embeds: [VCDeafen]
            });

        })

        // VC Undefean
        client.on("voiceChannelUndeaf", (member, deafType) => {


            const VCUndeafen = new MessageEmbed()
                .setTitle('User Undeafend')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " become undeafed!");

            return LogChannel.send({
                embeds: [VCUndeafen]
            });

        })

        // User Started to Stream
        client.on("voiceStreamingStart", (member, voiceChannel) => {


            const UserStreaming = new MessageEmbed()
                .setTitle('User Started to Stream')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " started streaming in " + voiceChannel.name);

            return LogChannel.send({
                embeds: [UserStreaming]
            });

        })

        // User Stopped to Stream
        client.on("voiceStreamingStart", (member, voiceChannel) => {


            const UserStoppedStreaming = new MessageEmbed()
                .setTitle('User Stopped to Stream')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " stopped streaming in " + voiceChannel.name);

            return LogChannel.send({
                embeds: [UserStoppedStreaming]
            });

        })
    }
}