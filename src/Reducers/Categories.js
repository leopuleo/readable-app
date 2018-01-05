import * as categoryActions from '../Actions/Categories';

function categories(state = [], action) {
  const { type, categories } = action;
  switch (type) {

    case categoryActions.RECEIVE_CATEGORIES:
      return categories
    default :
      return state
  }

}

export default categories;
