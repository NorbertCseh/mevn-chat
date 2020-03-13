var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'users'
  },
  avatar: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})
module.exports = Room = mongoose.model('rooms', RoomSchema)
