import { combineReducers } from 'redux'
import categories from './Categories.js';
import posts from './Posts.js';

export default combineReducers({
  categories,
  posts
})
