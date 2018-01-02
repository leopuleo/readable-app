import { combineReducers } from 'redux'
import categories from './Categories'
import { loadingPosts, posts, currentPost, postsOrder } from './Posts'
import { loadingComments, currentPostComments, editingComment } from './Comments'

export default combineReducers({
  loadingPosts,
  categories,
  posts,
  currentPost,
  loadingComments,
  currentPostComments,
  editingComment,
  postsOrder
})
