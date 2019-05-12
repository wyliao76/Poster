const Users = require('../models/users')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/user')

exports.register = async (req, res, next) => {
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
    // let hash
    let salt = await bcrypt.genSalt(10)
    // if (!salt) {
    //   throw new Error("Adding salt failed!")
    //   return res.json({
    //     errors: "Adding salt failed!"
    //   })
    // }
    let hash = await bcrypt.hash(req.body.password, salt)
    // if (!hash) {
    //   return res.json({
    //     errors: "Hashing failed!"
    //   })
    // }
    user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: 'admin'
    })
    user.save()
    res.json({
      result: "ok"
    })
  } catch (err) {next(err)}
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
    res.redirect('/user/login')
  } catch (err) {next(err)}
}
