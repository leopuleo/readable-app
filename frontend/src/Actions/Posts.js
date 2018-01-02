import { getPosts, getSinglePost, sendNewPost, updatePost, deletePost, updateVotesPost } from '../Utils/Api'

export const LOADING_POSTS = 'LOADING_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const NEW_POST = 'NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const SORT_POST = 'SORT_POST'

export const loadingPosts = status => ({
  type: LOADING_POSTS,
  status
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => {
  dispatch(loadingPosts(true))
  getPosts().then( (posts)  => {
    dispatch(receivePosts(posts))
    dispatch(loadingPosts(false))
  })
}

export const receiveSinglePost = post => ({
  type: RECEIVE_SINGLE_POST,
  post
})

export const fetchSinglePost = (id) => dispatch => {
  dispatch(loadingPosts(true))
  getSinglePost(id).then( (post) => {
    dispatch(receiveSinglePost(post))
    dispatch(loadingPosts(false))
  })
}

export const newPostCreated = post => ({
  type: NEW_POST,
  post
})

export const createNewPost = (post) => dispatch =>
  sendNewPost(post).then( post  =>
    dispatch(newPostCreated(post))
)

export const singlePostUpdated = post => ({
  type: UPDATE_POST,
  post
})

export const updateSinglePost = (post) => dispatch =>
  updatePost(post).then( post  =>
    dispatch(singlePostUpdated(post))
)

export const singlePostDeleted = post => ({
  type: DELETE_POST,
  post
})

export const deleteSinglePost = (post) => dispatch =>
  deletePost(post).then( post =>
    dispatch(singlePostDeleted(post))
)

export const singlePostVoteUpdated = (post) => ({
  type: UPDATE_VOTE,
  post
})

export const updateSinglePostVote = (id, vote) => dispatch =>
  updateVotesPost(id, vote).then( post =>
    dispatch(singlePostVoteUpdated(post))
)

export const sortPost = orderyBy => ({
  type: SORT_POST,
  orderyBy
})

export const updatePostOrder = (orderyBy) => dispatch =>
  dispatch(sortPost(orderyBy))
