const Users = require('../models/users')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const passport = require('passport')


exports.register = async (req, res, next) => {
  if (req.method === 'GET') {
    return res.render('register')
  }
  if (req.method === 'POST') {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      let user = await Users.findOne(
        {email: req.body.email}
      )
      if (user) {
        return res.json({
          errors: "This email has been used!"
        })
      }
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(req.body.password, salt)

      user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'admin'
      })
      user.save()
      req.login(user, (err) => {
        if (err) { return next(err) }
        return res.redirect('/')
      })
    } catch (err) {next(err)}
  }
}

exports.login = (req, res, next) => {
  // if (req.method === 'GET') {
    return res.render('login')
  // }
  // if (req.method === 'POST') {
  //   return res.redirect('/index')
  // }
}

exports.logout = async (req, res, next) => {
  try {
    req.logout()
    res.redirect('/')
  } catch (err) {next(err)}
}
