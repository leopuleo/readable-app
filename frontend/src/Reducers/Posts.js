import {
  RECEIVE_POSTS
} from '../Actions/Posts';

function posts(state = [], action) {
  const { type, posts } = action;

  switch (type) {
    case RECEIVE_POSTS :
      return posts
      default :
        return state
  }

}

export default posts;
