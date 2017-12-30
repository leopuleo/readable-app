import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleComments } from '../Actions/Comments'
import PropTypes from 'prop-types'
import CommentSingle from './CommentSingle'

class CommentList extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    parentId: PropTypes.string.isRequired,
    commentCount: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { parentId, getCurrentPostComments } = this.props
    getCurrentPostComments(parentId)
  }

  render() {
    const { currentPostComments, commentCount } = this.props
    return(
      <div className="comment-list">
        <h3 className="comment-list-title">{commentCount} { commentCount === 1 ? 'comment' : 'comments' }</h3>
        {currentPostComments.filter((comment) => comment.deleted !== true).map((comment) => (
          <CommentSingle key={comment.id} comment={comment} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ currentPostComments }) {
  return {
    currentPostComments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentPostComments: (id) => dispatch(fetchSingleComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
