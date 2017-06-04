import { combineReducers } from 'redux';
import posts, { defaultPosts } from './posts';

export const generateInitialState = () => ({posts: defaultPosts()});

const rootReducer = combineReducers({posts});

export default rootReducer;
