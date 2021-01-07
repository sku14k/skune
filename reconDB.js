const { reconDB } = require('reconlx');

const rdb = new reconDB({
    uri: 'mongodb+srv://recondb:recondb123@recondatabase.fqvag.mongodb.net/test'
})

module.exports = rdb;