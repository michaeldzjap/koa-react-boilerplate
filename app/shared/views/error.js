import React, { Component } from 'react'
import Helmet from 'react-helmet'

class Error extends Component {
  render() {
    return (
      <div>
        <Helmet title="Koa-React Biolerplate | Error" />
        <h1>Error!</h1>
      </div>
    )
  }
}

export default Error
