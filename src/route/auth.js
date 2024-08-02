const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

User.create({
  email: 'asd@asd.asd',
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
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: "Error, alredy registered"
      })
    }

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

// ========================================== //

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    title: 'Recovery Account',
    data: {

    },
  })
})

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: "Error, no email"
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: "Error, no such a user exist"
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Code has been sent'
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ========================================== //

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    title: 'Recovery Confirm',
    data: {},
  })
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: "Error, fill all fields"
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    console.log(email)
    if (!email) {
      return res.status(400).json({
        message: 'email not exist',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:  'user not exist',
      })
    }

    console.log(user)

    user.password = password

    console.log(user)

    return res.status(200).json({
      message: 'Password changed successfully'
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
