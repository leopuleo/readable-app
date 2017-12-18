import {
  RECEIVE_POSTS,
  RECEIVE_SINGLE_POST,
  NEW_POST,
  LOADING_DATA
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
