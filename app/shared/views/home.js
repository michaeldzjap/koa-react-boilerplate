import React, { Component } from 'react'
import Post from '../components/post'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Post id="what" title="What is it?" content="<p>This project provides a starting point for a web app using several modern web technologies, including: Koa2, Webpack2 + React</p><p>Use it to build something cool.</p>" />
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <header className="header" id="home">
        <div className="container">
          <img className="img" src="http://placehold.it/100x150" alt="Logo" title="Logo" />
          <h1 className="title">Koa-React</h1>
          <p className="description">
            A Koa, React + Webpack scaffolding app
            <br />
            <i>
              <small>Currently v1.0.0</small>
            </i>
          </p>
        </div>
      </header>
    )
  }
}

export default Home
