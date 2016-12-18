import path from 'path'
import http from 'http'
import Koa from 'koa'
import serve from 'koa-static'
import compress from 'koa-compress'
import logger from 'koa-logger'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpack from 'webpack'

import { errorMiddleware, routerMiddleware, renderMiddleware } from './middleware'
import config from '../../config'
import webpackConfig from '../../webpack.config.development'

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
app.use(serve(path.join(__dirname, '../../public')));
app.use(compress({
  filter: content_type => /text/i.test(content_type),
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(routerMiddleware())
app.use(renderMiddleware())

http.createServer(app.callback()).listen(config.app.port, _ => {
  console.log(`Koa started in ${app.env} mode on ${config.app.url}:${config.app.port}; press Ctrl-C to terminate.`)
})
