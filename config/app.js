const app = {
  url: process.env.URL || 'http://localhost',
  port: process.env.PORT || 3000,
  debug: process.env.APP_DEBUG || false,
  env: process.env.NODE_ENV || 'development',
  title: 'Koa-React Boilerplate'
}

module.exports = app
