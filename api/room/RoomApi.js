const express = require('express')
const passport = require('passport')
const router = express.Router()
const Room = require('../../models/Room')
const User = require('../../models/User')

router.get('/test', (req, res) => {
  res.status(200).json({ msg: 'Rooms works' })
})

router.post(
  '/',
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
          createdBy: req.user.id,
          members: [req.user.id]
        })
        newRoom
          .save()
          .then(newRoom => {
            res.status(201).json({
              _id: newRoom._id,
              msg: `${newRoom.name} is created`
            })
          })
          .catch(err => {
            console.log(`Error at creating room: ${err}`)
          })
      }
    })
  }
)

router.put(
  '/add-member/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({ _id: req.params.room_id }).then(room => {
      if (!room) {
        res.status(400).json('There is no room like this WTF')
      } else {
        if (room.members.includes(req.user._id)) {
          res.status(400).json(`She/He is already member of ${room.name}`)
        } else {
          room.members.push(req.user._id)
          room
            .save()
            .then(room => {
              res
                .status(200)
                .json(`${req.user.displayName} added to ${room.name}`)
            })
            .catch(err => console.log('Error joining room: ' + err))
        }
      }
    })
  }
)

router.put(
  '/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({ name: req.body.name })
      .then(room =>
        room ? res.status(400).json('Room name already taken') : null
      )
      .catch(err => console.log(err))
    Room.findOne({
      _id: req.param.room_id
    }).then(room => {
      if (!room.members.includes(req.user._id)) {
        res.status(400).json("You don't have the permission to edit this room")
      } else {
        room = {
          name: req.body.name,
          members: req.body.members,
          password: req.body.newPassword,
          avatar: req.body.avatar
        }
        room
          .save()
          .then(room => {
            res.status(200).json(`${room.name} was successfully edited`)
          })
          .catch(err => {
            console.log(`Error editing room: ${err}`)
          })
      }
    })
  }
)

router.delete(
  '/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({
      _id: req.param.room_id
    }).then(room => {
      if (!room.createdBy === req.user._id) {
        res
          .status(400)
          .json(
            'You do not have permission to delete this room. Only the creator can delete it.'
          )
      } else {
        room
          .remove()
          .then(() => {
            res.status(200).json('Room successfully deleted')
          })
          .catch(err => {
            console.log(`Error deleting room: ${err}`)
          })
      }
    })
  }
)

router.get(
  '/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({
      _id: req.params.room_id
    }).then(room => {
      if (!room) {
        res.status(400).json({ Error: 'Room does not exists' })
      } else {
        if (!room.members.includes(req.user.id)) {
          res
            .status(400)
            .json({ Error: `You are not a member of ${room.name}` })
          console.log('hit')
        } else {
          res.status(200).json(room)
        }
      }
    })
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.find()
      .sort({
        createdDate: -1
      })
      .then(rooms => {
        if (!rooms) {
          res.status(400).json('There is no rooms')
        } else {
          res.status(200).json(rooms)
        }
      })
  }
)

module.exports = router
