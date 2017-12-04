import React, { Component } from 'react'

class PostListNotFound extends Component {
  render() {
    const { post } = this.props
    return(
       <div className="post-list-not-found">
          No posts found
       </div>
    )
  }
}

export default PostListNotFound
