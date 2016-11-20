import path from 'path'
import React from 'react'
import { PassThrough } from 'stream'
import ReactDOMStream from 'react-dom-stream/server'
import { match, RouterContext, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../shared/store/configureStore'
import config from '../../config'
import routes from './routes'
import { defaultPosts } from '../shared/reducers/posts'
import 'babel-polyfill'

/**
 * Loop through all components in the renderProps object
 * and return a new object with the desired key
 *
 * @param Object renderProps
 * @param Array componentProps
 * @return Object props
 */
const getPropsFromRoute = ({routes}: Object, componentProps: Array) => {
  const props = {}
  const lastRoute = routes[routes.length - 1]

  routes.reduceRight((prevRoute, currRoute) => {
    componentProps.forEach(componentProp => {
      if (!props[componentProp] && currRoute.component[componentProp]) {
        props[componentProp] = currRoute.component[componentProp]
      }
    })
  }, lastRoute)

  return props
}

/**
 * Create HTML response as a stream and embed initial data (if any)
 *
 * @param String reactInitialData
 * @param Object routerContext
 * @return PassThrough stream
 */
const createHTMLStream = (reactInitialData: String, provider: Object) => {
  const stream = new PassThrough()
  stream.write(
    `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta httpEquiv="x-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Koa-React Scaffold</title>
      </head>
      <body>
        <div id="root" class="wrapper"><div>`
  )
  const reactStream = ReactDOMStream.renderToString(provider)
  reactStream.pipe(stream, {end: false})
  reactStream.on('end', _ => {
    let htmlString = '</div></div>'
    htmlString += reactInitialData ? `<script id="initial-data">window.__INITIAL_STATE__ = ${reactInitialData}</script>` : ''
    htmlString += `<script type="text/javascript" src="/assets/bundle.js"></script>
        <script type="text/javascript" src="/assets/styles.js"></script>
      </body>
      </html>`
    stream.write(htmlString)
    stream.end()
  })

  return stream
}

/**
 * @param Object renderProps
 * @return Object {status, body}
 */
const renderPage = (renderProps: Object) => {
  const routeProps = getPropsFromRoute(renderProps, ['requestInitialData', 'receiveInitialData', 'defaultState'])
  const status = 200
  let initialState = {posts: defaultPosts()}

  /**
   * Configure the store and render the Provider
   * @param Object initialState
   * @param Object renderProps
   * @return PassThrough body
   */
  const renderProvider = (initialState: Object, renderProps: Object) => {
    const store = configureStore(initialState)
    const body = createHTMLStream(
      JSON.stringify(initialState),
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
    return body
  }

  if (routeProps.requestInitialData && routeProps.receiveInitialData && routeProps.defaultState) {
    return routeProps.requestInitialData().then(data => {
      const defaultState = routeProps.defaultState()  // default reducer state
      const key = Object.keys(defaultState)[0]  // the reducer key
      const nextState = Object.assign({}, defaultState[key], routeProps.receiveInitialData(data)) // update reducer state
      initialState = Object.assign({}, initialState, {[key]: nextState})  // update total reducer state
      const body = renderProvider(initialState, renderProps)
      return {status, body}
    })
  } else {
    const body = renderProvider(initialState, renderProps)
    return {status, body}
  }
}

/**
 * @param String location
 * @return mixed
 */
export const router = (location: String) => new Promise((resolve, reject) => {
  match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) {
        reject(err)
      } else if (redirectLocation) {
        const status = 302
        const redirect = path.join(redirectLocation.pathname, redirectLocation.search)
        resolve({status, redirect})
      } else if (renderProps) {
        resolve(renderPage(renderProps))
      } else {
        const err = new Error('Not found')
        err.status = 404
        reject(err)
      }
  })
})
