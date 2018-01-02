import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSinglePostVote } from '../Actions/Posts'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

class PostVote extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  /**
   * @description Handle post vote
   * @param {string} Post id to vote
   * @param {string} Vote action: upVote, downVote
   */
  handleVotePost(id, vote) {
    const { updateCurrentPostVote } = this.props
    updateCurrentPostVote(id, vote)
  }

  render() {
    const { post } = this.props
    return(
      <div className="entry-votes">
        <div className="votes-tools">
          <Button color="link" onClick={() => this.handleVotePost(post.id, 'upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Button>
          <Button color="link" onClick={() => this.handleVotePost(post.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>
        </div>
        <span className="votes-count">{ post.voteScore }</span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentPostVote: (id, vote) => dispatch(updateSinglePostVote(id, vote))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostVote)
