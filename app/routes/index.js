import path from 'path'
import React from 'react'
import { PassThrough } from 'stream'
import ReactDOMStream from 'react-dom-stream/server'
import { match, RouterContext } from 'react-router'
import config from '../../config'
import routes from './routes'

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
const createHTMLStream = (reactInitialData: String, routerContext: Object) => {
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
  const reactStream = ReactDOMStream.renderToString(routerContext)
  reactStream.pipe(stream, {end: false})
  reactStream.on('end', _ => {
    let htmlString = '</div></div>'
    htmlString += reactInitialData ? `<script id="initial-data" type="application/json">${reactInitialData}</script>` : ''
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
 */
const renderRoute = (renderProps: Object) => {
  const routeProps = getPropsFromRoute(renderProps, ['requestInitialData'])
  const status = 200
  let body
  if (routeProps.requestInitialData) {
    routeProps.requestInitialData().then(data => {
      const handleCreateElement = (Component, props) => (<Component initialData={data} {...props} />)
      body = createHTMLStream(JSON.stringify(data), <RouterContext createElement={handleCreateElement} {...renderProps} />)
      return {status, body}
    })
  } else {
    body = createHTMLStream(null, <RouterContext {...renderProps} />)
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
        resolve(renderRoute(renderProps))
      } else {
        const err = new Error('Not found')
        err.status = 404
        reject(err)
      }
  })
})
