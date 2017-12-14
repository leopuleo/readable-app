import React, { Component }from 'react'
import Banner from './Banner'
import PostForm from './PostForm'

class PostNew extends Component {
  render() {
    return (
      <div className="post-new">
        <Banner title='New post' />
        <PostForm formStatus="new" />
      </div>
    )
  }
}

export default PostNew;
