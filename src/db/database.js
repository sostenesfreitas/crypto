module.exports = (database, name, total, buyPrice, logo) => {
  database.transaction((tx) => {
    var query = 'INSERT INTO moeda (name, total, buyPrice, logo) VALUES (?, ?, ?, ?)'
    tx.executeSql(query, [name, total, buyPrice, logo])
  })
}
