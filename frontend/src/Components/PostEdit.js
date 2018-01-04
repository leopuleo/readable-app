import React, { Component }from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import PageTitle from './PageTitle'
import Loading from './Loading'
import PostForm from './PostForm'
import { Container } from 'reactstrap'

class PostEdit extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  render() {
    const { loadingPosts } = this.props
    return (
      <div className="post-edit">
        <PageTitle title='Edit post' />
        <Container>
          { loadingPosts ? (
            <Loading />
          ) : (
            <PostForm formStatus="edit" currentPost={this.props.currentPost} />
          )}
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ currentPost, loadingPosts }) {
  return {
    currentPost,
    loadingPosts
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
