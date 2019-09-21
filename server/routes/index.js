const users = require('./user')
const auth = require('./auth')
const post = require('./post')
const photo = require('./photo')

module.exports = app => {
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/posts', post);
  app.use('/photos', photo)

  // etc..
}