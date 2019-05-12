const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
          body('username', 'Username must not be empty.')
          .isString()
          .isLength({ min: 1 })
          .trim(),
          body('email', 'Invalide email.')
          .isString()
          .isEmail()
          .trim(),
          body('password', 'Password should be at least 8 char or digits.')
          .isString()
          .isLength({ min: 8 })
          .trim(),
          body('password2', 'Confirm password should be at least 8 char or digits.')
          .isString().trim()
          .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm password does not match password')
          }
          return true
        })
      ]
    }
  }
}
