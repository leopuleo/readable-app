import {
  RECEIVE_SINGLE_COMMENTS,
  NEW_COMMENT
} from '../Actions/Comments';

function currentPostComments(state = [], action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_SINGLE_COMMENTS :
      return action.comments
    case NEW_COMMENT :
      return [
        ...state,
        action.comment
      ]
    default :
      return state
  }

}

export default currentPostComments
