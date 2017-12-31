import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSingleComment, setEditingComment } from '../Actions/Comments'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import moment from 'moment'
import { Button, ButtonGroup } from 'reactstrap'

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
    const commentDate = moment(comment.timestamp).format("DD/MM/YYYY")
    return(
      <div key={ comment.id } className="comment-single">
        {editingComment === comment.id ?
          <CommentForm formStatus="edit" currentComment={comment} parentId={comment.parentId} />
          :
          <div className="comment-content">
            <h6 className="comment-author">{comment.author} wrote:</h6>
            <span className="comment-date">{ commentDate }</span>
            <div className="comment-body">{comment.body}</div>
            <ButtonGroup className="comment-tools" size="sm">
              <Button color="link" onClick={() => this.handleDeleteComment(comment.id)}>Delete</Button>
              <Button color="link" onClick={() => this.handleUpdateComment(comment.id)}>Edit</Button>
            </ButtonGroup>
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
