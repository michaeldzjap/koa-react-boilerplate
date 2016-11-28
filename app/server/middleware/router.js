import React from 'react'
import { matchPattern, ServerRouter } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from '../../shared/store/configureStore'
import { makeRoutes } from '../../routes/routes'

/**
 * Walk through (nested) routes to extract requestInitialData funcs if location
 * matches route pattern
 *
 * @param String location
 * @param Array routes
 * @return Array requestInitialData
 */
export const extractInitialDataRequests = (pathname: String, routes: Array) => {
  const dataRequests = []
  const collect = routes => {
    for (const route of routes) {
      if (matchPattern(route.pattern, {pathname}, route.exactly || null, route.parent || null) && route.hasOwnProperty('requestInitialData')) {
        dataRequests.push(route.requestInitialData)
      }
      if (route.hasOwnProperty('routes')) { // recursion for nested routes
        collect(route.routes)
      }
    }
  }
  collect(routes)

  return dataRequests
}

export const createProvider = (location: String, context: Object, initialState: Object) => {
  const store = configureStore(initialState)
  return (
    <Provider store={store}>
      <ServerRouter location={location} context={context}>
        {makeRoutes()}
      </ServerRouter>
    </Provider>
  )
}
