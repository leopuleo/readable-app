import React, { Component }from 'react'
import PageTitle from './PageTitle'
import PostForm from './PostForm'
import { Container } from 'reactstrap'


class PostNew extends Component {
  render() {
    return (
      <div className="post-new">
        <Container>
          <PageTitle title='New post' />
          <PostForm formStatus="new" />
        </Container>
      </div>
    )
  }
}

export default PostNew;
