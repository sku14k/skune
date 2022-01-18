const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'prefix',
    async execute(message, args) {
        let prefix;
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
        if (prefixes == null) {
          prefix = "skune";
        } else {
          prefix = prefixes;
        }

        message.reply({
            embed: {
              color: "#679ad8",
              description: `\`\`\`Командын угтвар тэмдэг <${prefix}> дээр тохируулагдсан байна.\`\`\``,
              footer: {
                text: "© 2022 14K",
              },
            },
          });
    }
}