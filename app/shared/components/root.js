import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import { makeAppRoutes } from '../../routes'
import configureStore from '../store/configureStore'

const store = configureStore(window.__INITIAL_STATE__)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter {...this.props}>
          {makeAppRoutes()}
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
