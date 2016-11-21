import path from 'path'
import React from 'react'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from '../../shared/store/configureStore'

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
    const store = configureStore()
    const context = createServerRenderContext()
    const result = context.getResult()
    if (result.redirect) {
      ctx.status = 301
      ctx.redirect(path.join(redirectLocation.pathname, redirectLocation.search))
    } else {
      ctx.status = result.missed ? 404 : 200
      // check url against routes, if one of them contains serverProps, fetch data,
      // compose initialState, make provider and router contect
      // await next and then render page
    }
    console.log('CONTEXT:', context)
    console.log('RESULT:', result)
    console.log('URL', ctx.url)
  }
}
