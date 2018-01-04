import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSingleCommentVote } from '../Actions/Comments'
import { Button } from 'reactstrap'

class CommentVote extends Component {

  /**
   * @description Handle comment vote
   * @param {string} Comment id to vote
   * @param {string} Vote action: upVote, downVote
   */
  handleVoteComment(id, vote) {
    const { updateCurrentCommentVote } = this.props
    updateCurrentCommentVote(id, vote)
  }

  render() {
    const { comment } = this.props
    return(
      <div className="entry-comment-votes">
        <div className="votes-comment-tools">
          <Button color="link" onClick={() => this.handleVoteComment(comment.id, 'upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Button>
          <Button color="link" onClick={() => this.handleVoteComment(comment.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>
        </div>
        <span className="votes-comment-count">{ comment.voteScore }</span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentCommentVote: (id, vote) => dispatch(updateSingleCommentVote(id, vote))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentVote)
