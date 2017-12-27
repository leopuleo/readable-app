import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleComments } from '../Actions/Comments'
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

  render() {

    const { currentPostComments } = this.props

    return(
      <div className="post-single-comments-list">
        {currentPostComments.map((comment) => (
          <div key={ comment.id } className="comment">
            <h4>{comment.author} says: </h4>
            <p>{comment.body}</p>
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
    getCurrentPostComments: (id) => dispatch(fetchSingleComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingleComments)
