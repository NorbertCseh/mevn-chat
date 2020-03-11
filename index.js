const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const passport = require('passport')

app.use(
  cors({
    origin: 'http://localhost:8080'
  })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = require('./api/user/UserApi')
const rooms = require('./api/room/RoomApi')

app.use('/api/user', users)
app.use('/api/room', rooms)

mongoose
  .connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

app.use(passport.initialize())

require('./config/passport')(passport)

app.get('/chat', (req, res) => res.send(''))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
