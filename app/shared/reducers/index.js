import { combineReducers } from 'redux'

import posts, { defaultPosts } from './posts'

export const generateInitialState = _ => ({posts: defaultPosts()})

const rootReducer = combineReducers({posts})

export default rootReducer
