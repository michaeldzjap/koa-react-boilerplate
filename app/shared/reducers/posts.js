import 'babel-polyfill'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../constants'

export const defaultPosts = _ => {
  return {
    posts: [],
    isFetching: false
  }
}

export const receivePosts = receivedPosts => {
  const posts = receivedPosts.posts.map(({title, content}) => ({title, content}))
  return Object.assign({}, {posts, isFetching: false})
}

const posts = (state = defaultPosts(), action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case FETCH_POSTS_SUCCESS:
      return receivePosts(action)

    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {isFetching: false})

    default:
      return state
  }
}

export default posts
