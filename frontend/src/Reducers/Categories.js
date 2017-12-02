import {
  RECEIVE_CATEGORIES
} from '../Actions/Categories';

function categories(state = {}, action) {
  const { type, categories } = action;
  switch (type) {

    case RECEIVE_CATEGORIES:
      return categories
    default :
      return state
  }

}

export default categories;
