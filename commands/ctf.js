const ms = require('parse-ms')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ctf',
    async execute(client, message, args) {
        let user = message.author;

        let timeout = 15000

        let ctf = await db.fetch(`ctf_${user.id}`)

        if (ctf !== null && timeout - (Date.now() - ctf) > 0) {
            let time = ms(timeout - (Date.now() - ctf))
            let timeEmbed = new MessageEmbed()
                .setColor('#679ad8')
                .setDescription(`\`\`\`${time.minutes} минут ${time.seconds} секундын дараагаар ctf командыг ашиглах боломжтой.\`\`\``)
            message.channel.send({ embeds: [timeEmbed] }).then(m => { setTimeout(async () => { await m.delete(); await message.delete() }, 15000) })
        } else {
            const positions = {
                safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
                danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',
                win: '_ _           :crown:**You won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
                lose: '_ _           :skull:**You lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
            };

            let randomized = Math.floor(Math.random() * 2);
            let gameEnded = false;
            let randomPos = positions[Object.keys(positions)[randomized]];
            let data = 0;

            const componentsArray = [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 'SECONDARY',
                            custom_id: 'e',
                            label: '\u200b',
                            disabled: true,
                        },
                        {
                            type: 2,
                            style: 'PRIMARY',
                            custom_id: String(Math.random()),
                            emoji: { id: '890611575227023391' },
                        },
                        {
                            type: 2,
                            style: 'SECONDARY',
                            custom_id: 'ee',
                            label: '\u200b',
                            disabled: true,
                        },
                    ],
                },
            ];

            const msg = await message.channel.send({
                content: `3 загас бариад хожоорой!\n\n${randomPos}`,
                components: componentsArray,
            });

            const filter = (button => { return button.user.id === message.author.id; });
            const game = await message.channel.createMessageComponentCollector({
                filter,
                componentType: 'BUTTON',
            });

            function update(button) {
                randomized = Math.floor(Math.random() * 2);
                randomPos = positions[Object.keys(positions)[randomized]];

                if (data === 3) {
                    gameEnded = true;
                    game.stop();
                    componentsArray[0].components[1].disabled = true;

                    msg.edit({
                        content: positions.win,
                        components: componentsArray,
                    });
                    button.reply({ content: 'ГЭГЭ! Та 3 загас барьлаа.' });
                }
                else if (data <= -9) {
                    gameEnded = true;
                    game.stop();
                    componentsArray[0].components[1].disabled = true;

                    msg.edit({
                        content: positions.lose,
                        components: componentsArray,
                    });
                    button.reply({ content: 'ӨӨ, Та хожигдлоо.' });
                }
                else {
                    if (button) return button.deferUpdate();
                    msg.edit({
                        content: randomPos + `           **${data}**`,
                        components: componentsArray,
                    });
                }
            }

            setInterval(() => {
                if (gameEnded === false) return update();
            }, 2000);

            game.on('collect', async (button) => {
                if (randomized !== 0) {
                    data -= 3;
                    update(button);
                }
                else {
                    data++;
                    update(button);
                }
            });
            db.set(`ctf_${user.id}`, Date.now())
        }
    },
};