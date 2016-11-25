import path from 'path'
import { createServerRenderContext } from 'react-router'

import { generateInitialState } from '../../shared/reducers'
import { routes } from '../../routes/routes'
import { extractInitialDataRequests, createProvider } from './router'

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
      const initialDataRequests = extractInitialDataRequests(ctx.url, routes)

      if (initialDataRequests.length) {
        const initialData = await Promise.all(
          initialDataRequests.map(initialDataRequest => Promise.resolve(initialDataRequest()))
        )
        ctx.initialState = Object.assign({}, initialState, ...initialData)  // Attach initial state to ctx
        ctx.routerContext = createProvider(ctx.url, context, ctx.initialState)
        await next()
      } else {
        ctx.initialState = initialState
        ctx.routerContext = createProvider(ctx.url, context, ctx.initialState)
        await next()
      }
    }
  }
}
