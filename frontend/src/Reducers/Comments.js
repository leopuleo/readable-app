import {
  RECEIVE_SINGLE_COMMENTS
} from '../Actions/Comments';

function currentPostComments(state = [], action) {
  const { type, comments } = action;
  switch (type) {

    case RECEIVE_SINGLE_COMMENTS:
      return comments
    default :
      return state
  }

}

export default currentPostComments
