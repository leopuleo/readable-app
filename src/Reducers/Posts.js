import * as postActions from '../Actions/Posts'

import * as commentActions from '../Actions/Comments';

import { dynamicSort } from '../Utils/SortPost'

export function loadingPosts(state = true, action) {
  const { type, status } = action;
  switch (type) {
    case postActions.LOADING_POSTS :
      return status
    default :
      return state
  }
}

export function posts(state = [], action) {
  const { type } = action;
  switch (type) {
    case postActions.RECEIVE_POSTS :
      return action.posts
    case postActions.NEW_POST :
      return [
        ...state,
        action.post
      ]
    case postActions.UPDATE_POST :
      return [
        ...state.filter(p => p.id !== action.post.id),
        action.post
      ]
    case postActions.DELETE_POST :
      return [
        ...state.filter(p => p.id !== action.post.id)
      ]
    case postActions.UPDATE_VOTE :
      const updatedPosts = state.map(item => {
        if(item.id === action.post.id) {
          return {...item, ...action.post}
        }
        return item
      })
      return updatedPosts
    case postActions.SORT_POST :
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
    case postActions.RECEIVE_SINGLE_POST :
      return post
    case postActions.DELETE_POST :
      return {
        ...state,
        'deleted': true
      }
    case commentActions.NEW_COMMENT :
      return {
        ...state,
        'commentCount': state.commentCount + 1
      }
    case commentActions.DELETE_COMMENT :
      return {
        ...state,
        'commentCount': state.commentCount - 1
      }
    case postActions.UPDATE_VOTE :
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
    case postActions.SORT_POST:
      return orderyBy
    default :
      return state
  }
}
