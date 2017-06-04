import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {

    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string
    }

    render() {
        return (
            <div className="container post" id={this.props.id}>
                <h5 className="title">{this.props.title}</h5>
                <div dangerouslySetInnerHTML={{__html: this.props.content}} />
            </div>
        );
    }

}

export default Post;
