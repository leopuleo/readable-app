import React, { Component }from 'react'
import PageTitle from './PageTitle'
import PostForm from './PostForm'
import { Container } from 'reactstrap'

class PostNew extends Component {
  render() {
    return (
      <div className="post-new">
        <PageTitle title='New post' />
        <Container>
          <PostForm formStatus="new" />
        </Container>
      </div>
    )
  }
}

export default PostNew;
