import React, { Component } from 'react'
import Footer from '../../components/footer'

class Admin extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Admin
