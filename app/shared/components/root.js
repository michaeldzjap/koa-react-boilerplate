import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import Main from '../views/layouts/main'
import { makeRoutes } from '../../routes'
import routes from '../../routes/app'
import { makeHead } from './head'
import configureStore from '../store/configureStore'

const store = configureStore(window.__INITIAL_STATE__)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter {...this.props}>
          {makeRoutes({layout: Main, head: makeHead({title: process.env.APP_TITLE}), routes})}
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
