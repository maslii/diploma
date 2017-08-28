module.exports = (db, wishes) => {
    const rating = require('./rate')
    const parser = require('./parse')

    const parsed = parser(db)
    const rated  = rating(parsed, wishes)

    return rated
}
