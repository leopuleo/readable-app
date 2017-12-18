import {
  LOADING_DATA,
  RECEIVE_POSTS,
  RECEIVE_SINGLE_POST,
  NEW_POST,
  UPDATE_POST
} from '../Actions/Posts'

export function loadingStatus(state = true, action) {
  const { type, status } = action;
  switch (type) {
    case LOADING_DATA :
      return status
    default :
      return state
  }
}

export function posts(state = [], action) {
  const { type, posts } = action;
  switch (type) {
    case RECEIVE_POSTS :
      return posts
    default :
      return state
  }
}

export function currentPost(state = {}, action) {
  const { type, post } = action;
  switch (type) {
    case RECEIVE_SINGLE_POST :
      return post
    default :
      return state
  }
}

export function newPost(state = posts, action) {
  const { type, post} = action;
  switch (type) {
    case NEW_POST :
      return [
        ...state,
        post
      ]
    default :
      return state
  }
}

export function updatePost(state = posts, action) {
  const { type, post} = action;
  switch (type) {
    case UPDATE_POST :
      return [
        ...state.filter(p => p.id !== post.id), post
      ]
    default :
      return state
  }
}
