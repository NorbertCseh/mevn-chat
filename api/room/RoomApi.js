import Room from '../../models/Room'
import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

router.get('/test', (req, res) => {
  res.status(200).json({ msg: 'Rooms works' })
})

router.post('/create-room', (req, res) => {
  Room.findOne({
    name: req.body.name
  }).then(room => {
    if (room) {
      res.status(400).json({ msg: 'Room with the same name already exists' })
    } else {
      newRoom = new Room({
        name: req.body.name,
        avatar: req.body.avatar,
        createdBy: req.body.user
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, salt) => {
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
})
