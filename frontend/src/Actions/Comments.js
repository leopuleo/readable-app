import { getSinglePostComments } from '../Utils/api';

export const RECEIVE_SINGLE_COMMENTS = 'RECEIVE_SINGLE_COMMENTS'

export const receiveSingleComments = comments => ({
  type: RECEIVE_SINGLE_COMMENTS,
  comments
})

export const fetchSingleComments = (id) => dispatch =>
  getSinglePostComments(id).then( comments  =>
    dispatch(receiveSingleComments(comments))
)
