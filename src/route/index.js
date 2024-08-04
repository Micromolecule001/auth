// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {
        name: 'index',
        title: 'index page',
        component: [],
        data: {},
    })
})

router.get('/home', function (req, res) {
    res.render('home', {
        name: 'Home',
        title: 'Home page',
        component: [],
        data: {},
    })
})

// Підключіть файли роутів
const auth = require('./auth')
// Підключіть інші файли роутів, якщо є
const user = require('./user')
// Об'єднайте файли роутів за потреби
router.use('/', auth)
router.use('/', user)

// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
