const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'example@gmail.com',
  password: 'qwerty12345',
  role: 1,
})

// ================================================================

router.get('/', function (req, res) {
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
})

router.post('/', function (req, res) {
  const { email, password, role } = req.body 

  console.log(req.body)

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Error"
    })
  }

  try {
    User.create({email,password,role})

    return res.status(200).json({
      message: "Success",
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }

  
})

// Підключаємо роутер до бек-енду
module.exports = router
