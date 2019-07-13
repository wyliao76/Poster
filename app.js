const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const config = require('./config')
const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')
const passport = require('passport')
const policies = require('./passport/policies')

// load bodyParser
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(express.json({limit: '10mb', extended: true}))

// Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// static
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 60 * 1000},
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Passport Config
require('./passport/passport')
// load passport
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
  res.locals.user = req.user || ''
  next()
})

app.get('/', (req, res, next) => {
  res.redirect('/posts')
})

app.use('/posts', postsRouter)
app.use('/user', usersRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Internal Server Error!')
})

const port = process.env.PORT || 3000
const server = require('http').createServer(app)
const options = {
  useNewUrlParser: true,
  user: config.db.user,
  pass: config.db.pass,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, options)
.then(() => {
  console.log('connect successful.')
  process.send('ready')
  server.listen(port, () => {
    console.log("Server running on port: " + port)
    console.log("The environment is: " + process.env.NODE_ENV)
  })
})
.catch((err) => {
  console.log(err)
  console.log('MongoDB connection failed')
  process.exit(1)
})

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
  console.log('Closing http server.')
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('Http server closed.')
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.')
      process.exit(0)
    })
  })
})
