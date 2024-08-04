const express = require('express');
const router = express.Router();

const { User } = require('../class/user');

// ================================================================

router.get('/user-list', function (req, res) {
  res.render('user-list', {
    name: 'user-list',
    component: ['back-button'],
    title: 'User list',
    data: {},
  });
});

router.get('/user-list-data', function (req, res) {
    const list = User.getList() // get the user list 

    console.log(list)

    // error handling list is not empty
    if (list.length === 0) {
        return res.status(400).json({
            message: 'List is empty'
        })
    }

    // if 'ok' --> return all data that we need
    return res.status(200).json({
        list: list.map(({id, email, role}) => ({
            id,
            email,
            role,
        })),
    })
})

// ================================================================

router.get('/user-item', function (req, res) {
    res.render('user-item', {
      name: 'user-item',
      component: ['back-button'],
      title: 'user-item',
      data: {},
    });
  });
  
router.get('/user-item-data', function (req, res) {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
          message: 'Id is empty'
      })
    }

    const user = User.getById(Number(id))

    // error handling user is not empty
    if (!user) {
      return res.status(400).json({
          message: 'User is empty'
      })
    }

    // if 'ok' --> return all data that we need
    return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isConfirm: user.isConfirm
        }
    })
})
// Connect router to backend
module.exports = router;
