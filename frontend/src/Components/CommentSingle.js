import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSingleComment, setEditingComment } from '../Actions/Comments'
import PropTypes from 'prop-types'
import CommentsForm from './CommentsForm'

class CommentSingle extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  handleDeleteComment(id){
    const { deleteComment } = this.props
    deleteComment(id)
  }

  handleUpdateComment() {
    const { editCommentStatus, comment } = this.props
    editCommentStatus(comment.id)
  }

  render() {
    const { comment, editingComment } = this.props
    return(
      <div key={ comment.id } className="comment-single">
        {editingComment === comment.id ?
          <CommentsForm formStatus="edit" currentComment={comment} parentId={comment.parentId} />
          :
          <div className="comment-content">
            <h4>{comment.author} says: </h4>
            <p>{comment.body}</p>
            <button onClick={() => this.handleDeleteComment(comment.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
            <button onClick={() => this.handleUpdateComment(comment.id)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({ editingComment }) {
  return {
    editingComment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id) => dispatch(deleteSingleComment(id)),
    editCommentStatus: (status) => dispatch(setEditingComment(status))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSingle)
