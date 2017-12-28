import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleComments, deleteSingleComment } from '../Actions/Comments'
import PropTypes from 'prop-types'

class PostSingleComments extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { postId, getCurrentPostComments } = this.props
    getCurrentPostComments(postId)
  }


  handleDeleteComment(id){
    const { deleteComment } = this.props
    deleteComment(id)
  }

  render() {
    const { currentPostComments } = this.props
    return(
      <div className="post-single-comments-list">
        {currentPostComments.filter((comment) => comment.deleted !== true).map((comment) => (
          <div key={ comment.id } className="comment">
            <h4>{comment.author} says: </h4>
            <p>{comment.body}</p>
            <button onClick={() => this.handleDeleteComment(comment.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
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
    getCurrentPostComments: (id) => dispatch(fetchSingleComments(id)),
    deleteComment: (id) => dispatch(deleteSingleComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingleComments)
