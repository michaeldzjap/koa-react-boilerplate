import path from 'path'
import http from 'http'
import Koa from 'koa'
import serve from 'koa-static'
import compress from 'koa-compress'
import logger from 'koa-logger'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpack from 'webpack'
import { PassThrough } from 'stream'

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
app.use(serve(path.join(__dirname, 'public')));
app.use(compress({
  filter: content_type => /text/i.test(content_type),
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(async ctx => {
  try {
    const {status, redirect, body} = await router(ctx.url)
    ctx.status = status

    if (redirect) {
      ctx.redirect(redirect)
    } else {
      const stream = new PassThrough()
      stream.write('<!DOCTYPE html>')
      body.pipe(stream, {end: false})
      body.on('end', _ => stream.end())
      ctx.type = 'text/html'
      ctx.body = stream
    }
  } catch (err) {
    ctx.throw(err.status, err.message)
  }
})

http.createServer(app.callback()).listen(config.app.port, _ => {
  console.log(`Koa started in ${app.env} mode on ${config.app.url}:${config.app.port}; press Ctrl-C to terminate.`)
})
