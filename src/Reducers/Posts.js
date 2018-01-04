import {
  LOADING_POSTS,
  RECEIVE_POSTS,
  RECEIVE_SINGLE_POST,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_VOTE,
  SORT_POST
} from '../Actions/Posts'

import {
  NEW_COMMENT,
  DELETE_COMMENT
} from '../Actions/Comments';

import { dynamicSort } from '../Utils/SortPost'

export function loadingPosts(state = true, action) {
  const { type, status } = action;
  switch (type) {
    case LOADING_POSTS :
      return status
    default :
      return state
  }
}

export function posts(state = [], action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_POSTS :
      return action.posts
    case NEW_POST :
      return [
        ...state,
        action.post
      ]
    case UPDATE_POST :
      return [
        ...state.filter(p => p.id !== action.post.id),
        action.post
      ]
    case DELETE_POST :
      return [
        ...state.filter(p => p.id !== action.post.id)
      ]
    case UPDATE_VOTE :
      const updatedPosts = state.map(item => {
        if(item.id === action.post.id) {
          return {...item, ...action.post}
        }
        return item
      })
      return updatedPosts
    case SORT_POST :
      return [
        ...state.sort(dynamicSort(action.orderyBy))
      ]
    default :
      return state
  }
}

export function currentPost(state = {}, action) {
  const { type, post } = action;
  switch (type) {
    case RECEIVE_SINGLE_POST :
      return post
    case DELETE_POST :
      return {
        ...state,
        'deleted': true
      }
    case NEW_COMMENT :
      return {
        ...state,
        'commentCount': state.commentCount + 1
      }
    case DELETE_COMMENT :
      return {
        ...state,
        'commentCount': state.commentCount - 1
      }
    case UPDATE_VOTE :
      return {
        ...state,
        'voteScore': post.voteScore
      }
    default :
      return state
  }
}

export function postsOrder(state = 'timestamp', action) {
  const { type, orderyBy} = action;
  switch (type) {
    case SORT_POST:
      return orderyBy
    default :
      return state
  }
}
