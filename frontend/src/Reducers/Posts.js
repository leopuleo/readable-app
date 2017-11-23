import {
  RECEIVE_POSTS
} from '../Actions/Posts';

function posts(state = {}, action) {
  const { type, posts } = action;

  switch (type) {
    case RECEIVE_POSTS :
      return posts.reduce((res, cur) => {
        res[cur.id] = cur
        return res
      }, state)
      default :
        return state
  }

}

export default posts;
