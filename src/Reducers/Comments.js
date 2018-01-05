import * as commentActions from '../Actions/Comments';

export function loadingComments(state = true, action) {
  const { type, status } = action;
  switch (type) {
    case commentActions.LOADING_COMMENTS :
      return status
    default :
      return state
  }
}

export function editingComment(state = false, action) {
  const { type, status } = action;
  switch (type) {
    case commentActions.EDITING_COMMENT :
      return status
    default:
      return state
  }
}

export function currentPostComments(state = [], action) {
  const { type } = action;
  switch (type) {
    case commentActions.RECEIVE_SINGLE_COMMENTS :
      return action.comments
    case commentActions.NEW_COMMENT :
      return [
        ...state,
        action.comment
      ]
    case commentActions.DELETE_COMMENT :
      return [
        ...state.filter(c => c.id !== action.comment.id),
          action.comment
      ]
    case commentActions.UPDATE_COMMENT :
      const updatedComments = state.map(item => {
        if(item.id === action.comment.id) {
          return {...item, ...action.comment}
        }
        return item
      })
      return updatedComments
    case commentActions.UPDATE_COMMENT_VOTE :
      const updatedCommentsVotes = state.map(item => {
        if(item.id === action.comment.id) {
          return {...item, ...action.comment}
        }
        return item
      })
      return updatedCommentsVotes
    default :
      return state
  }
}

