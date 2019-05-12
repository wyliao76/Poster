const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const validator = require('../validator/validator')
const passport = require('passport')
const policies = require('../passport/policies')

router.route('/register')
.post(validator.validate('register'), usersController.register)

router.route('/login')
.get(usersController.login)
.post(passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/user/login'
}))

router.route('/logout')
.get(usersController.logout)

router.route('/get_judging_profiles')
.post(policies.isLoggedIn, usersController.get_judging_profiles)

module.exports = router
