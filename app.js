import http from 'http'
import Koa from 'koa'
import logger from 'koa-logger'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpack from 'webpack'

import { errorMiddleware } from './app/server/middleware'
import config from './config'
import webpackConfig from './webpack.config'
import { router } from './app/routes'

const app = new Koa()

if (config.app.env === 'development') {
  app.use(logger())

  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
  }))
  app.use(hotMiddleware(compiler))
}

app.use(errorMiddleware())

app.use(async ctx => {
  try {
    const {status, redirect, body} = await router(ctx.url)
    ctx.status = status

    if (redirect) {
      ctx.redirect(redirect)
    } else {
      ctx.type = 'text/html'
      ctx.body = body
    }
  } catch (err) {
    ctx.throw(err.status, err.message)
  }
})

http.createServer(app.callback()).listen(config.app.port, _ => {
  console.log(`Koa started in ${app.env} mode on http://localhost:${config.app.port}; press Ctrl-C to terminate.`)
})
