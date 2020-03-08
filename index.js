const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
const bcrypt = require('bcrypt')

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

//Database is fine

const newUser = new User({
  email: 'email',
  displayName: 'name',
  avatar: 'avatar'
})

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('hashMePls', salt, (err, hash) => {
    if (err) throw err
    newUser.password = hash
    newUser
      .save()
      .then(user => console.log(user))
      .catch(err => console.log(err))
  })
})

// User.findOne({
//   email: 'email'
// })
//   .then(user => console.log(user))
//   .catch(err => console.log(err))

app.get('/chat', (req, res) => res.send(''))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
