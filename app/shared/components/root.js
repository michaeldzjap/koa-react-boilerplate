import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from  '../../routes/routes'
import configureStore from '../store/configureStore'

const store = configureStore(window.__INITIAL_STATE__)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>
    )
  }
}

export default Root
