import path from 'path'
import React from 'react'
import { match, RouterContext, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import 'babel-polyfill'

import { defaultPosts } from '../shared/reducers/posts'
import configureStore from '../shared/store/configureStore'
import HTMLStream from '../server/html'
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
 * @param Object renderProps
 * @return Object {status, body}
 */
const renderPage = (renderProps: Object) => {
  const routeProps = getPropsFromRoute(renderProps, ['requestInitialData', 'receiveInitialData', 'defaultState'])
  const status = 200
  let initialState = {posts: defaultPosts()}

  /**
   * Configure the store and render the page
   * @param Object initialState
   * @param Object renderProps
   * @return RenderStream stream
   */
  const renderProvider = (initialState: Object, renderProps: Object) => {
    const store = configureStore(initialState)
    const markup = <Provider store={store}><RouterContext {...renderProps} /></Provider>
    const helmet = Helmet.rewind()
    return HTMLStream({initialState, markup, helmet})
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
