import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Post from '../components/post'
import AppApi from '../api/AppApi'
import PostsActionCreators from '../actions/PostsActionCreators'
import { defaultPosts, receivePosts } from '../reducers/posts'

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

class Home extends Component {
  componentDidMount() {
    // Client side data fetching: when this was not the 1st page loaded from server
    if (!this.props.posts.length) {
      PostsActionCreators.fetchPosts()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Post id="what" title="What is it?" content="<p>This project provides a starting point for a web app using several modern web technologies, including: Koa2, Webpack2 + React</p><p>Use it to build something cool.</p>" />
      </div>
    )
  }
}

Home.propTypes = {
  posts: PropTypes.array.isRequired
}

/**
 * Server side data fetching: fetch posts before loading page
 */
Home.requestInitialData = _ =>  AppApi.fetchPosts()

/**
 * Server side data fetching: handle received data
 */
Home.receiveInitialData = posts => receivePosts(posts)

/**
 * Server side data fetching: shape of posts state
 */
Home.defaultState = _ => ({posts: defaultPosts()})

const mapStateToProps = state => ({
  posts: state.posts.posts
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
