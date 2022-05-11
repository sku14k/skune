const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'fb',
    async execute(client, message, args) {
        let user = message.author;

        let timeout = 15000

        let fb = await db.fetch(`fb_${user.id}`)

        if (fb !== null && timeout - (Date.now() - fb) > 0) {
            let time = ms(timeout - (Date.now() - fb))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${time.minutes} минут ${time.seconds} секундын дараагаар fb командыг ашиглах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            const positions = {
                left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
                middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
                right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
            };
            let randomized = Math.floor(Math.random() * Object.keys(positions).length);
            let gameEnded = false;
            let randomPos = positions[Object.keys(positions)[randomized]];

            const componentsArray = [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 'SECONDARY',
                            custom_id: 'left',
                            label: 'Left',
                        },
                        {
                            type: 2,
                            style: 'PRIMARY',
                            custom_id: 'middle',
                            label: 'Middle',
                        },
                        {
                            type: 2,
                            style: 'SECONDARY',
                            custom_id: 'right',
                            label: 'Right',
                        },
                    ],
                },
            ];

            const msg = await message.channel.send({
                content: randomPos,
                components: componentsArray,
            });
            function update() {
                randomized = Math.floor(Math.random() * Object.keys(positions).length);
                randomPos = positions[Object.keys(positions)[randomized]];

                msg.edit({
                    content: randomPos,
                    components: componentsArray,
                });
            }
            setInterval(() => {
                if (gameEnded == false) return update();
            }, 1000);

            const filter = button => {
                return button.user.id === message.author.id;
            };
            const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

            if (button.customId !== Object.keys(positions)[randomized]) {
                gameEnded = true;
                return button.reply({ content: 'Та хожлоо!' });
            }
            else {
                gameEnded = true;
                return button.reply({ content: 'Та хожигдлоо!' });
            }

            db.set(`fb_${user.id}`, Date.now())
        }
    },
};