// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('auth', {
    name: 'auth',
    component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],
    title: 'Auth',
    data: {
      role: [
        {
          value: User.USER_ROLE.USER,
          text: 'User',
        },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Admin',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Developer',
        }
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// Підключаємо роутер до бек-енду
module.exports = router
