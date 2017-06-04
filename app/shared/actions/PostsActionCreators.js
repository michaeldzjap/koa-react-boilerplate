import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../constants';
import AppApi from '../api/AppApi';

const PostsActionCreators = {
    fetchPosts() {
        return dispatch => {
            dispatch({type: FETCH_POSTS_REQUEST});
            AppApi.fetchPosts().then(
                posts => dispatch({type: FETCH_POSTS_SUCCESS, posts}),
                error => dispatch({type: FETCH_POSTS_FAILURE, error})
            );
        };
    }
};

export default PostsActionCreators;
