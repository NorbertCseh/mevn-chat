var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})
module.exports = User = mongoose.model('users', UserSchema)
