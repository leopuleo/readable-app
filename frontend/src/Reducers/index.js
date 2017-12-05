import { combineReducers } from 'redux'
import categories from './Categories'
import { posts, currentPost } from './Posts'
import currentPostComments from './Comments'

export default combineReducers({
  categories,
  posts,
  currentPost,
  currentPostComments
})
