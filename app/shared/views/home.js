import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../components/post';
import PostsActionCreators from '../actions/PostsActionCreators';

class Header extends Component {

    render() {
        return (
            <header className="header" id="home">
                <div className="container">
                    <img className="img" src="http://placehold.it/100x150" alt="Logo" title="Logo" />
                    <h1 className="title">Koa-React</h1>
                    <p className="description">
                        Boilerplate for a universal Koa, React + Webpack app
                        <br />
                        <i>
                            <small>Currently v1.0.0</small>
                        </i>
                    </p>
                </div>
            </header>
        );
    }

}

class Home extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired
    }

    componentDidMount() {
        // Client side data fetching: when this was not the 1st page loaded from server
        if (!this.props.posts.length) {
            this.props.fetchPosts();
        }
    }

    render() {
        const posts = this.props.posts.map(({id, title, content}) => <Post key={id} title={title} content={content} />);
        return (
            <div>
                <Header />
                {posts}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(PostsActionCreators.fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
