const express = require('express')
var cors = require('cors')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const passport = require('passport')
const serveStatic = require('serve-static')

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
  .connect(process.env.MONGODB_URI || keys.MONGODB_URI, {
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

const server = http.Server(app)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(serveStatic(__dirname + '/client/dist'))

//Create socket for every room
const io = socketIo(server)
//connection -> when someone connects to the socket
io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
  //Will to this when someone connects
  socket.emit('hello', {
    greeting: 'Hello Paul'
  })
})
