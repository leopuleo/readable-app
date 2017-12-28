import { combineReducers } from 'redux'
import categories from './Categories'
import { loadingStatus, posts, currentPost } from './Posts'
import { currentPostComments, editingComment } from './Comments'

export default combineReducers({
  loadingStatus,
  categories,
  posts,
  currentPost,
  currentPostComments,
  editingComment
})
