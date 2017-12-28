import { getSinglePostComments, sendNewComment, deleteComment, updateComment } from '../Utils/api';

export const RECEIVE_SINGLE_COMMENTS = 'RECEIVE_SINGLE_COMMENTS'
export const NEW_COMMENT = 'NEW_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const EDITING_COMMENT = 'EDITING_COMMENT'

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

export const singleCommentDeleted = comment => ({
  type: DELETE_COMMENT,
  comment
})

export const deleteSingleComment = (id) => dispatch =>
  deleteComment(id).then( comment  =>
    dispatch(singleCommentDeleted(comment))
)

export const singleCommentUpdated = comment => ({
  type: UPDATE_COMMENT,
  comment
})

export const updateSingleComment = (comment) => dispatch =>
  updateComment(comment).then( comment  =>
    dispatch(singleCommentUpdated(comment))
)

export const editingComment = status => ({
  type: EDITING_COMMENT,
  status
})

export const setEditingComment = (status) => dispatch =>
  dispatch(editingComment(status))
