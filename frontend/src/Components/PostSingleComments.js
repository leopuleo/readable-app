import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleComments } from '../Actions/Comments'
import PropTypes from 'prop-types'
import moment from 'moment'

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
            {comment.author} says: {comment.body}
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
