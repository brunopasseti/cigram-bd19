const users = require('./user')
const auth = require('./auth')
const post = require('./post')
const topico = require("./topico")
// const photo = require('./photo')

module.exports = app => {
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/posts', post);
  app.use('/topicos', topico);
  // etc..
}