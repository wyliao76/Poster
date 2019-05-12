
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next()
  } else {
    // req.flash('danger', 'Login required.')
    res.redirect('/user/login')
  }
}
