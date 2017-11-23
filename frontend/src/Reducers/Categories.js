import {
  RECEIVE_CATEGORIES
} from '../Actions/Categories';

function categories(state = {}, action) {
  const { type, categories } = action;
  switch (type) {

    case RECEIVE_CATEGORIES:
      return categories.reduce((res, cur) => {
        res[cur.path] = cur
        return res
      }, state)
    default :
      return state
  }

}

export default categories;
