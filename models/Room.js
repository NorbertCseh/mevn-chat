var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: [Schema.type.User]
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
  },
  createdBy: {
    type: Schema.type.User,
    required: true
  }
})
module.exports = Room = mongoose.model('rooms', RoomSchema)
