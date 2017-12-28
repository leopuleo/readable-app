import { getPosts, getSinglePost, sendNewPost, updatePost, deletePost, updateVotesPost } from '../Utils/api';

export const LOADING_DATA = 'LOADING_DATA'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const NEW_POST = 'NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'

export const loadingData = status => ({
  type: LOADING_DATA,
  status
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => {
  dispatch(loadingData(true))
  getPosts().then( (posts)  => {
    dispatch(receivePosts(posts))
    dispatch(loadingData(false))
  })
}

export const receiveSinglePost = post => ({
  type: RECEIVE_SINGLE_POST,
  post
})

export const fetchSinglePost = (id) => dispatch => {
  dispatch(loadingData(true))
  getSinglePost(id).then( (post) => {
    dispatch(receiveSinglePost(post))
    dispatch(loadingData(false))
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

