const { QuickClick } = require('weky')

module.exports = {
    name: 'qc',
    async execute(client, message, args) {
        await QuickClick({
            message: message,
            embed: {
                title: 'Хурдан дар',
                color: '#679ad8',
            },
            time: 60000,
            waitMessage: 'Хэзээ ч эхэлж болно...',
            startMessage: 'Эхэлж зөв товчлуур дээр дарсан нь ялна. Танд {{time}} хугацаа байна!',
            winMessage: 'ЗИА ГЭГЭ, <@{{winner}}> товчлуур дээр {{time}} секунданд дарлаа.',
            loseMessage: 'Хэн ч товчлуур дээр дараагүй тул цуцлагдлаа.',
            emoji: '👆',
            ongoingMessage: "Тоглолт аль хэдийнээ <#{{channel}}> текст суваг дээр явагдаж байна."
        });
    }
}