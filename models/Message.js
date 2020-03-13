var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MessageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  room: {
    type: Schema.type.Room
  },
  messages: {
    type: [String]
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.type.User,
    required: true
  }
})
module.exports = Message = mongoose.model('rooms', MessageSchema)
