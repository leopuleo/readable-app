import {
  RECEIVE_SINGLE_COMMENTS,
  NEW_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  EDITING_COMMENT,
  LOADING_COMMENTS
} from '../Actions/Comments';

export function loadingComments(state = true, action) {
  const { type, status } = action;
  switch (type) {
    case LOADING_COMMENTS :
      return status
    default :
      return state
  }
}

export function editingComment(state = false, action) {
  const { type, status } = action;
  switch (type) {
    case EDITING_COMMENT :
      return status
    default:
      return state
  }
}

export function currentPostComments(state = [], action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_SINGLE_COMMENTS :
      return action.comments
    case NEW_COMMENT :
      return [
        ...state,
        action.comment
      ]
    case DELETE_COMMENT :
      return [
        ...state.filter(c => c.id !== action.comment.id),
          action.comment
      ]
    case UPDATE_COMMENT :
      const updatedComments = state.map(item => {
        if(item.id === action.comment.id) {
          return {...item, ...action.post}
        }
        return item
      })
      return updatedComments
    default :
      return state
  }
}

