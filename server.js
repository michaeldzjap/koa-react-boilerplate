require('babel-polyfill')
if (process.env.NODE_ENV === 'development') {
  require('babel-register')
  require('./app/server/app.js')
} else {
  require('./build/server/app.js')
}
