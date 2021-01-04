const Discord = require('discord.js');

module.exports = client => {
    console.log(`${client.user.username} аслаа`);
    client.user.setStatus('available');
    client.user.setPresence({
        game: {
            name: 'https://skunebot.com', 
            type: 0
        }
    });
}