const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()
const Room = require('../../models/Room')
const User = require('../../models/User')

router.get('/test', (req, res) => {
  res.status(200).json({ msg: 'Rooms works' })
})

router.post(
  '/create-room',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({
      name: req.body.name
    }).then(room => {
      if (room) {
        res.status(400).json({ msg: 'Room with the same name already exists' })
      } else {
        newRoom = new Room({
          name: req.body.name,
          avatar: req.body.avatar,
          createdBy: req.user.id
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              throw err
            } else {
              newRoom.password = hash
              newRoom
                .save()
                .then(newRoom => {
                  res.status(201).json({
                    msg: `${newRoom.name} is created`
                  })
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
        })
      }
    })
  }
)

module.exports = router
