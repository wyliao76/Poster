const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')
const validator = require('../validator/validator')
const policies = require('../passport/policies')


router.route('/')
.get(postsController.index)

// create post
router.route('/createPost')
.get(policies.isLoggedIn, postsController.createPost)
// .post(policies.isLoggedIn, postsController.createPost)

// // get a single post
// router.get('/post/:id', postsController.post)
//
// // edit post
// router.route('/post/edit/:id')
// .get(policies.isLoggedIn, postsController.post_edit_get)
// .post(policies.isLoggedIn, postsController.post_edit_post)
//
// // get delete post
// router.route('/post/delete/:id')
// .get(policies.isLoggedIn, postsController.post_delete_get)
// .post(policies.isLoggedIn, postsController.post_delete_post)


module.exports = router
