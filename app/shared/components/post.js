import React, { Component, PropTypes } from 'react'

class Post extends Component {
  render() {
    return (
      <div className="container post" id={this.props.id}>
        <h5 className="title">{this.props.title}</h5>
        <div dangerouslySetInnerHTML={{__html: this.props.content}} />
      </div>
    )
  }
}

Post.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string
}

export default Post
