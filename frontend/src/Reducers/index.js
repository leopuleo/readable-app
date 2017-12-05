import { combineReducers } from 'redux'
import categories from './Categories.js';
import { posts, currentPost } from './Posts.js';

export default combineReducers({
  categories,
  posts,
  currentPost
})
