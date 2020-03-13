const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const User = require('../../models/User')

router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works'
  })
)

// Find user by id
router.get('/:user_id', (req, res) => {
  User.findById(req.param.user_id)
    .populate('user', ['email', 'displayName', 'avatar', 'createdDate'])
    .then(user => {
      if (!user) {
        res.status(404).json('User not found')
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(404).json({
        msg: 'User not found'
      })
    })
})

// Register user
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: 'Email address already taken' })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            throw err
          } else {
            newUser = new User({
              email: req.body.email,
              displayName: req.body.displayName,
              avatar: req.body.avatar,
              password: hash
            })
            newUser
              .save()
              .then(user => {
                res.status(201).json({ msg: `${user.displayName} register` })
              })
              .catch(err => console.log(err))
          }
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(400).json('Wrong email or password')
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(400).json('Wrong email or password')
        } else {
          const payLoad = {
            id: user.id,
            displayName: user.displayName,
            avatar: user.avatar
          }
          jwt.sign(
            payLoad,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) {
                throw err
              } else {
                res.status(200).json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            }
          )
        }
      })
    }
  })
})

module.exports = router
