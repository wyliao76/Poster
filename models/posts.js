let mongoose = require('mongoose')

// schema
let PostSchema = mongoose.Schema(
  {
    author_id: {
      type: String,
      required: true,
      max: 100
    },
    title: {
      type: String,
      required: true,
      max: 100
    },
    body: {
      type: String,
      required: true
    },
    preview: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: null
    },
  }
)

// export model
module.exports = mongoose.model('Post', PostSchema, 'post')
