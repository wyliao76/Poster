let mongoose = require('mongoose')
let Schema = mongoose.Schema

// schema
let UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  portrait: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    defalut: 'guest'
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
})

// export model
module.exports = mongoose.model('Users', UsersSchema, 'users')
