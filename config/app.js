const config = {
  port: process.env.PORT || 3000,
  debug: process.env.APP_DEBUG || false,
  env: process.env.NODE_ENV || 'development'
}

export default config
