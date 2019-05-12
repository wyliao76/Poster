const Users = require('../models/users')
const bcrypt = require('bcryptjs')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  (email, password, done) => {
    Users.findOne({email: email}).lean()
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' })
      }
      bcrypt.compare(password, user.password)
      .then((res) => {
        if (res === true) {
          return done(null, user)
        }
        return done(null, false, { message: 'Incorrect username or password' })
      })
      .catch((err) => {throw err})
    })
    .catch((err) => {return done(err)})
  })
)

passport.serializeUser((user, done) => {
  delete user.password
  done(null, user)
})

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user)
  })
})

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//   },
//   function(email, password, done) {
//     console.log("use")
//     Users.findOne({email:email}, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username or password.' });
//       }
//       console.log(user)
//       bcrypt.compare(password, user.password, function(err, isMatch){
//         if(err) throw err;
//       if(isMatch){
//         return done(null, user);
//       } else {
//         return done(null, false, {message: 'Incorrect username or password'});
//       }
//     })
//     });
//   }
// ));

module.exports = passport
