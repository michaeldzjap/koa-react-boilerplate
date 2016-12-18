import path from 'path'
import { PassThrough } from 'stream'
import { createServerRenderContext } from 'react-router'
import Helmet from 'react-helmet'

import Main from '../../shared/views/layouts/main'
import { generateInitialState } from '../../shared/reducers'
import appRoutes from '../../routes/app'
import { makeHead } from '../../shared/components/head'
import { extractInitialDataRequests, createProvider } from './router'
import HTMLStream from '../html'
import config from '../../../config'

export const errorMiddleware = _ => {
  return async (ctx, next) => {
    // catch all downstream errors here
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = {message: err.message}
      ctx.app.emit('error', err, ctx)
    }
  }
}

export const routerMiddleware = _ => {
  return async (ctx, next) => {
    const context = createServerRenderContext()
    const result = context.getResult()
    if (result.redirect) {
      ctx.status = 301
      ctx.redirect(path.join(redirectLocation.pathname, redirectLocation.search))
    } else {
      ctx.status = result.missed ? 404 : 200

      const initialState = generateInitialState()
      const initialDataRequests = extractInitialDataRequests(ctx.url, appRoutes)

      if (!result.missed && initialDataRequests.length) {
        const initialData = await Promise.all(
          initialDataRequests.map(initialDataRequest => Promise.resolve(initialDataRequest()))
        )
        ctx.initialState = Object.assign({}, initialState, ...initialData)  // Attach initial state to ctx
        ctx.routerContext = createProvider(ctx.url, context, ctx.initialState, {layout: Main, head: makeHead({title: config.app.appTitle}), routes: appRoutes})
        await next()
      } else {
        ctx.initialState = initialState
        ctx.routerContext = createProvider(ctx.url, context, ctx.initialState, {layout: Main, head: makeHead({title: config.app.appTitle}), routes: appRoutes})
        await next()
      }
    }
  }
}

export const renderMiddleware = _ => {
  return async ctx => {
    const stream = new PassThrough()
    const helmet = Helmet.rewind()
    const body = HTMLStream({
      initialState: ctx.initialState,
      markup: ctx.routerContext,
      helmet,
      scripts: ['bundle.js']
    })
    stream.write('<!DOCTYPE html>')
    body.pipe(stream, {end: false})
    body.on('end', _ => stream.end())
    ctx.type = 'text/html'
    ctx.body = stream
  }
}
