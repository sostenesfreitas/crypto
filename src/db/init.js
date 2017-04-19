var database = require('./../db/db')
module.exports = database.transaction(transaction => {
  transaction.executeSql('CREATE TABLE IF NOT EXISTS moeda' +
  ' (idmoeda INTEGER PRIMARY KEY  AUTOINCREMENT, name, total, buyPrice, logo)')
})
