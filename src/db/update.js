module.exports = (database, id, total) => {
  database.transaction(function (tx) {
    var query = 'UPDATE jogador SET total = ? WHERE idmoeda = ?'
    tx.executeSql(query, [total, id], function (tx, res) {
    })
  })
}
