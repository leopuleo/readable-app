import { getSinglePostComments, sendNewComment } from '../Utils/api';

export const RECEIVE_SINGLE_COMMENTS = 'RECEIVE_SINGLE_COMMENTS'
export const NEW_COMMENT = 'NEW_COMMENT'

export const receiveSingleComments = comments => ({
  type: RECEIVE_SINGLE_COMMENTS,
  comments
})

export const fetchSingleComments = (id) => dispatch =>
  getSinglePostComments(id).then( comments  =>
    dispatch(receiveSingleComments(comments))
)

export const newCommentCreated = comment => ({
  type: NEW_COMMENT,
  comment
})

export const createNewComment = (comment) => dispatch =>
  sendNewComment(comment).then( comment  =>
    dispatch(newCommentCreated(comment))
)
