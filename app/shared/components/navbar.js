import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <nav className="navigation">
        <div className="container">
          <a className="navigation-title" href="#">
            <img className="img" src="http://placehold.it/200x100" height="30" alt="Brand" title="Brand" />
            {' '}
            <h1 className="title">Koa-React</h1>
          </a>
          <ul className="navigation-list float-right">
            <li className="navigation-item">
              <a className="navigation-link" href="#">Contact</a>
            </li>
            <li className="navigation-item">
              <a className="navigation-link" href="#">Dummy</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
