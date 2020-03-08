var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: String,
  displayName: String,
  password: String,
  avatar: String,
  date: { type: Date, default: Date.now }
})
module.exports = User = mongoose.model('users', UserSchema)
