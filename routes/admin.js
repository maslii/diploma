const express  = require('express')
const router   = express.Router()
const database = require('../db/config')
const multer   = require('multer')
const fs       = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now())
    }
})

const upload = multer({
    storage: storage
})

router.get('/', (req, res) => {
    database.find({}, (err, docs) => {
        if (err) {
            res.send(err.stack)
        } else {
            res.render('admin/index', {
                title: 'Адміністрування',
                phones: docs
            })
        }
    })
})

router.get('/add', (req, res) => {
    res.render('admin/add', {
        title: 'Додати'
    })
})

router.post('/add', upload.single('image'), (req, res) => {
    const data = req.body
    data.image = req.file.filename

    database.insert(data, err => {
        if (err) {
            res.send(err.stack)
        } else {
            res.send('OK')
        }
    })
})

router.get('/delete/:id', (req, res) => {
    database.findOne(
        {
            _id: req.params.id
        },
        function (err, docs) {
            if (err) {
                res.send(err.stack)
            } else {
                fs.unlink('./public/img/' + docs.image, err => {
                    if (err) {
                        res.send(err.stack)
                    } else {
                        database.remove(
                            {
                                _id: req.params.id
                            },
                            {},
                            function (err) {
                                if (err) {
                                    res.send(err.stack)
                                } else {
                                    res.redirect('/admin')
                                }
                            }
                        )
                    }
                })
            }
        }
    )
})

module.exports = router
