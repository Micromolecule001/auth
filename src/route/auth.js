const express = require('express');
const router = express.Router();

const { User } = require('../class/user');
const { Confirm } = require('../class/confirm');
const { Session } = require('../class/session');

User.create({
  email: 'asd@asd.asd',
  password: 'qwerty12345',
  role: 1,
});

// ================================================================

router.get('/signup', function (req, res) {
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
  });
});

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body;

  console.log(req.body);

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Error: Missing fields"
    });
  }

  try {
    const user = User.getByEmail(email);

    if (user) {
      return res.status(400).json({
        message: "Error: Already registered"
      });
    }

    const newUser = User.create({ email, password, role });

    const session = Session.create(newUser);
    
    Confirm.create(newUser.email);

    return res.status(200).json({
      message: "Success",
      session,  // Ensure the session object with token is included in the response
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

// ========================================== //

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    title: 'Recovery Account',
    data: {},
  });
});

router.post('/recovery', function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Error, no email"
    });
  }

  try {
    const user = User.getByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Error, no such a user exist"
      });
    }

    Confirm.create(email);

    return res.status(200).json({
      message: 'Code has been sent'
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

// ========================================== //

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    title: 'Recovery Confirm',
    data: {},
  });
});

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body;

  console.log(password, code);

  if (!code || !password) {
    return res.status(400).json({
      message: "Error, fill all fields"
    });
  }

  try {
    const email = Confirm.getData(Number(code));

    console.log(email);
    if (!email) {
      return res.status(400).json({
        message: 'email not exist',
      });
    }

    const user = User.getByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: 'user not exist',
      });
    }

    console.log(user);

    user.password = password;

    const session = Session.create(user);

    return res.status(200).json({
      message: 'Password changed successfully',
      session
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

// ============================================== // 

router.get('/signup-confirm', function (req, res) {
  return res.render('signup-confirm', {
    name: 'signup-confirm',
    component: ['back-button', 'field'],
    title: 'Signup Confirm',
    data: {},
  });
});

router.post('/signup-confirm', function (req, res) { // Changed from /recovery-confirm to /signup-confirm
  const { code, token } = req.body;

  if (!code || !token) {
    return res.status(400).json({
      message: 'error, fields weren’t filled'
    });
  }

  try {
    const session = Session.get(token);

    if (!session) {
      return res.status(400).json({
        message: 'Error, login in account'
      });
    }

    const email = Confirm.getData(code);

    if (!email) {
      return res.status(400).json({
        message: 'code undefined'
      });
    }

    if (email !== session.data.email) {
      return res.status(400).json({
        message: 'code unavailable'
      });
    }

    session.user.isConfirm = true;

    return res.status(200).json({
      message: 'Email has been confirmed',
      session,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============================================== // 

router.get('/login', function (req, res) {
  return res.render('login', {
    name: 'login',
    component: ['back-button', 'field', 'field-password'],
    title: 'Login',
    data: {},
  });
});

router.post('/login', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'errorrrrrrrrr'
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'errororrorror'
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'ewrjj;lkwe'
      })
    }

  const session = Session.create(user)

  return res.status(200).json({
    message: 'logggggeeeed in;',
    session
  })
  } catch (error) {
    
  }
});

// Connect router to backend
module.exports = router;
