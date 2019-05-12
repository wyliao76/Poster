const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const validator = require('../validator/validator')
const passport = require('passport')
const policies = require('../passport/policies')

router.route('/register')
.get(usersController.register)
.post(validator.validate('register'), usersController.register)

router.route('/login')
.get(usersController.login)
.post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.route('/logout')
.get(usersController.logout)

module.exports = router
