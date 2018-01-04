import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSingleComment, setEditingComment } from '../Actions/Comments'
import { Button } from 'reactstrap'

class CommentActions extends Component {

  /**
   * @description Handle comment edit
   * @param {string} Comment id to edit
   */
  handleUpdateComment(id) {
    const { editCommentStatus } = this.props
    editCommentStatus(id)
  }

  /**
   * @description Handle comment deletion
   * @param {string} Comment id to delete
   */
  handleDeleteComment(id){
    const { deleteComment } = this.props
    deleteComment(id)
  }


  render() {
    const { comment } = this.props
    return(
      <div className="entry-comment-tools">
        <Button color="link" onClick={() => this.handleUpdateComment(comment.id)}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button color="link" onClick={() => this.handleDeleteComment(comment.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
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
)(CommentActions)
