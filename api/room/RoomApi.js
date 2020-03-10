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
                  console.log(`Error at creating room: ${err}`)
                })
            }
          })
        })
      }
    })
  }
)

router.post(
  '/join-room',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({ name: req.body.name }).then(room => {
      if (!room) {
        res.status(400).json('Wrong room name or password')
      } else {
        if (room.members.includes(req.user.id)) {
          res.status(400).json(`You are already member of ${room.name}`)
        } else {
          bcrypt.compare(req.body.password, room.password, (err, result) => {
            if (err) {
              res.status(400).json('Wrong room name or password')
            } else {
              room.members.push(req.user.id)
              room
                .save()
                .then(room => {
                  res
                    .status(200)
                    .json(`${req.user.displayName} added to ${room.name}`)
                })
                .catch(err => console.log('Error joining room: ' + err))
            }
          })
        }
      }
    })
  }
)

router.post(
  '/edit-room/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({
      id: req.param.room_id
    }).then(room => {
      if (!room.members.includes(req.user.id)) {
        res.status(400).json('You dont have the permission to edit this room')
      } else {
        bcrypt.compare(req.body.password, room.password, (err, result) => {
          if (err) {
            console.log(err)
            res.status(400).json('Password is incorrect')
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
    })
  }
)

router.delete(
  '/delete/:room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({
      id: req.param.room_id
    }).then(room => {
      if (!room.id === req.user.id) {
        res
          .status(400)
          .json(
            'You do not have permission to delete this room. Only the creator can delete it.'
          )
      } else {
        bcrypt.compare(req.body.password, room.password, (err, result) => {
          if (err) {
            console.log(`Error from delete room: ${err}`)
            res.status(400).json('Password is incorrect')
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
    })
  }
)

// router.get(
//   '/:room_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Room.findOne({
//       id: req.param.id
//     }).then(room => {
//       if (!room) {
//         res.status(400).json('Room does not exists')
//       } else {
//         if (!room.members.includes(req.user.id)) {
//           res.status(400).json(`You are not a member of ${room.name}`)
//         } else {
//           res.status(200).json({ msgs: room.mes })
//         }
//       }
//     })
//   }
// )

module.exports = router
