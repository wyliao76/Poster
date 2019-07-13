const Users = require('../models/users')
const Posts = require('../models/posts')
const { validationResult } = require('express-validator/check')


exports.index = async (req, res, next) => {
  try {
    let query = {}
    if (req.body.last_id) {
      query['_id'] = {$lt: req.body.last_id}
    }
    let posts = await Posts.find(
      query
    )
    .limit(30)
    .sort({ _id: -1 })
    .lean()

    return res.render('index', {
      posts: posts
    })
  } catch (err) {next(err)}
}

exports.createPost = async (req, res, next) => {
  if (req.method === 'GET') {
    return res.render('createPost')
  }
  if (req.method === 'POST') {
    let post = new Post({
      author_id: req.user._id,
      title: req.body.title,
      body: req.body.body,
      preview: req.body.preview,
    })
    post.save()
  }
}
