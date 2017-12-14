import React, { Component }from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import Banner from './Banner'
import PostForm from './PostForm'

class PostEdit extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  render() {
    return (
      <div className="post-edit">
        <Banner title='Edit post' />
        <PostForm formStatus="edit" currentPost={this.props.currentPost} />
      </div>
    )
  }
}

function mapStateToProps({ currentPost }) {
  return {
    currentPost
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
