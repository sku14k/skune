const client = require('../index');
const words = require('../as.json');
const rdb = require('../reconDB');

client.on('message', async(message) => {
    if(await rdb.has(`swear-${message.guild.id}`) === false) return;

    for (let i = 0; i < words.length; i++) {
        if(message.content.includes(words[i])) {
            message.delete();
            message.reply({
                embed: {
                    color: "#00FF00",
                    title: 'Анхааруулга :exclamation:',
                    description: `\`\`\`Энэ үгийг сервер дээр ашиглахыг хориглоно!\`\`\``,
                    footer: {
                        text: "© 2021. 14K"
                    }
                }
            }).then(m => m.delete({timeout: 3000}));
        }
    }
})