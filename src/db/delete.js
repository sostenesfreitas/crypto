module.exports = (database, id) => {
  database.transaction(function (tx) {
    var query = 'DELETE FROM moeda WHERE idmoeda = ?'
    tx.executeSql(query, [id], function (tx, res) {
    })
  })
}
