const nedb = require('nedb')
const db = new nedb({ filename: './db/database' })
db.loadDatabase()

module.exports = db
