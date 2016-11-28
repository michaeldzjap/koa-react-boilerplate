import 'babel-polyfill'

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../constants'
import AppApi from '../api/AppApi'

export const defaultPosts = _ => ({
  posts: [],
  isFetching: false
})

export const receivePosts = receivedPosts => {
  const posts = receivedPosts.posts.map(({id, title, content}) => ({id, title, content}))
  return Object.assign({}, {posts, isFetching: false})
}

export const requestInitialPostsData = _ => (
  AppApi.fetchPosts().then(
    posts => ({posts: Object.assign({}, defaultPosts(), receivePosts(posts))})
  )
)

const posts = (state = defaultPosts(), action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case FETCH_POSTS_SUCCESS:
      return receivePosts(action.posts)

    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {isFetching: false})

    default:
      return state
  }
}

export default posts
