const Discord = require("discord.js");
const fs = require('fs');


module.exports = {
    name: "afk",
    description: "AFK",


  async execute(message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var serverQueue = afk[message.guild.id]
       if (serverQueue) {
            serverQueue.afk = !serverQueue.afk;
             message.channel.send({
                embed: {
                    color: "#679ad8",
                    description: `💤 АФК **\`${serverQueue.afk === true ? "идэвхижлээ" : "унтарлаа."}\`**`
                }
            });
            return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
    });
        };
    return message.channel.send({
        embed: {
            color: "#679ad8",
            description: `\`\`\`Серверт дуу тоглоогүй байгаа тул та энэ коммандыг ажиллуулж чадахгүй.\`\`\``
        }
    }).then(m => m.delete({timeout: 5000})).then(message.delete({timeout: 5000}));
  },
};
