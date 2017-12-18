import React, { Component }from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import Banner from './Banner'
import Loading from './Loading'
import PostForm from './PostForm'

class PostEdit extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  render() {
    const { loadingStatus } = this.props
    return (
      <div className="post-edit">
        <Banner title='Edit post' />
        { loadingStatus ? (
          <Loading />
        ) : (
          <PostForm formStatus="edit" currentPost={this.props.currentPost} />
        )}
      </div>
    )
  }
}

function mapStateToProps({ currentPost, loadingStatus }) {
  return {
    currentPost,
    loadingStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentPost: (id) => dispatch(fetchSinglePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEdit)
