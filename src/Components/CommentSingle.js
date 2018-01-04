import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import CommentActions from './CommentActions'
import CommentVote from './CommentVote'
import moment from 'moment'
import { Row, Col } from 'reactstrap'

class CommentSingle extends Component {

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
            <div className="comment-date">{ commentDate }</div>
            <div className="comment-body">{comment.body}</div>
            <Row>
              <Col xs="6">
                <CommentActions comment={comment} />
              </Col>
              <Col xs="6">
                <CommentVote comment={comment} />
              </Col>
            </Row>
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

export default connect(
  mapStateToProps,
  null
)(CommentSingle)
