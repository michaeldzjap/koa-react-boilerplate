import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Main
