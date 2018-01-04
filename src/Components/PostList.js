import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListContent from './PostListContent'
import Loading from './Loading'
import { Row, Alert, Col } from 'reactstrap'

class PostList extends Component {

  render() {
    const { postList, loadingPosts } = this.props
    if(loadingPosts) {
      return(<Loading/>)
    }
    return(
       <div className="post-list">
        <Row>
          {postList.length > 0 ? postList.map((post) => (
            <PostListContent key={post.id} post={post} />
          )) :
            <Col sm="12"><Alert color="warning">No posts found</Alert></Col>
          }
        </Row>
      </div>
    )
  }
}

function mapStateToProps({ loadingPosts }) {
  return {
    loadingPosts
  }
}

export default connect(
  mapStateToProps,
  null
)(PostList)
