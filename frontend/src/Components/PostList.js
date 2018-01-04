import React, { Component } from 'react'
import PostListContent from './PostListContent'
import { Row, Alert } from 'reactstrap'

class PostList extends Component {

  render() {
    const { postList } = this.props
    return(
       <div className="post-list">
        <Row>
          {postList.length > 0 ? postList.map((post) => (
            <PostListContent key={post.id} post={post} />
          )) :
            <Alert color="warning">No posts found</Alert>
          }
        </Row>
      </div>
    )
  }
}

export default PostList
