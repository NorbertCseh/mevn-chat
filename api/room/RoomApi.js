const express = require('express')
const passport = require('passport')
const router = express.Router()
const Room = require('../../models/Room')
const User = require('../../models/User')
const validator = require('validator')

router.post(
  '/create-room',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (validator.isEmpty(req.body.name)) {
      res.status(400).json({ Error: 'Name cannot be empty' })
    } else if (validator.isEmpty(req.user.id)) {
      res.status(400).json({ Error: 'You are not logged in' })
    } else {
      Room.findOne({
        name: req.body.name
      }).then(room => {
        if (room) {
          res.status(400).json({ Error: 'Name already exists' })
        } else {
          newRoom = new Room({
            name: req.body.name,
            avatar: validator.isURL(req.body.avatar)
              ? req.body.avatar
              : 'https://www.hotukdeals.com/assets/img/profile-placeholder_f56af.png',
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
              res.status(400).json({ Error: err })
            })
        }
      })
    }
  }
)

router.put(
  '/add-member/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (validator.isEmpty(req.body.displayName)) {
      res.status(400).json({ Error: 'Field cannot be empty' })
    } else {
      Room.findOne({ _id: req.params.room_id }).then(room => {
        if (!room) {
          res.status(400).json({ Error: 'There is no room like this WTF' })
        } else {
          User.findOne({ displayName: req.body.name }).then(user => {
            if (!user) {
              res.status(400).json({ Error: 'No user like this' })
            } else {
              if (room.members.includes(user._id)) {
                res
                  .status(400)
                  .json({ Error: `She/He is already member of ${room.name}` })
              } else {
                room.members.push(user._id)
                room
                  .save()
                  .then(room => {
                    res
                      .status(200)
                      .json(`${req.user.displayName} added to ${room.name}`)
                  })
                  .catch(err => res.status(400).json({ Error: err }))
              }
            }
          })
        }
      })
    }
  }
)

//Should send back the data that the room already have and display it
router.post(
  '/edit-room/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({ name: req.body.name })
      .then(room =>
        room ? res.status(400).json({ Error: 'Room name already taken' }) : null
      )
      .catch(err => console.log(err))
    Room.findOne({
      _id: req.param.room_id
    }).then(room => {
      if (!room.members.includes(req.user._id)) {
        res
          .status(400)
          .json({ Error: "You don't have the permission to edit this room" })
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
            res.status(400).json({ Error: err })
          })
      }
    })
  }
)

router.delete(
  '/delete-room/:room_id',
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
            res.status(200).json({ msg: 'Room successfully deleted' })
          })
          .catch(err => {
            res.status(400).json({ Error: err })
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
        let joinedRooms = []
        rooms.forEach(element => {
          if (element.members.includes(req.user._id)) {
            joinedRooms.push(element)
          }
        })
        if (joinedRooms.length === 0) {
          res.status(400).json({ Error: "You don't have any rooms" })
        } else {
          res.status(200).json(joinedRooms)
        }
      })
  }
)

module.exports = router
