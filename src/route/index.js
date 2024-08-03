// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

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

// Об'єднайте файли роутів за потреби
router.use('/', auth)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
