const express    = require('express')
const bodyparser = require('body-parser')
const logger     = require('morgan')
const ejs        = require('ejs')

const app = new express()

app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended: false
    })
)
app.use(logger('dev'))

app.use(express.static('public'))

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))

app.use((req, res, next) => {
    const err  = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res) => {
    res.status(err.status || 500)
    res.send(err.stack)
})

app.listen(process.env.PORT || 3000)
