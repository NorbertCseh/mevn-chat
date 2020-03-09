const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')

//Why do I need this, pls check it future Norbi
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = require('./api/user/UserApi')
app.use('/api/user', users)

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
