const express = require('express')
const router = express.Router()
const database = require('../db/config')
const expert = require('../expert/expert')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Диплом',
    })
})

router.get('/fast', (req, res) => {
    res.render('fast', {
        title: 'Швидкий пошук',
    })
})

router.get('/search', (req, res) => {
    database.find({}, (err, docs) => {
        if (err) {
            res.send(err.stack)
        }

        let t = []

        docs.forEach(x => {
            t.push(x['vendor'])
        })

        let u = t.filter(function(elem, index, self) {
            return index === self.indexOf(elem)
        })

        res.render('search', {
            title: 'Розширений пошук',
            x: u,
        })
    })
})

router.post('/answer', (req, res) => {
    database.find({}, (err, docs) => {
        if (err) {
            res.send(err.stack)
        }

        const answer = expert(docs, req.body)
        res.render('parts/answer', {
            phones: answer,
        })
    })
})

module.exports = router
