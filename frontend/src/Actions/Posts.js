import { getPosts, getSinglePost } from '../Utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch =>
  getPosts().then( posts  =>
    dispatch(receivePosts(posts))
  )

export const receiveSinglePost = post => ({
  type: RECEIVE_SINGLE_POST,
  post
})

export const fetchSinglePost = (id) => dispatch =>
  getSinglePost(id).then( post  =>
    dispatch(receiveSinglePost(post))
  )


