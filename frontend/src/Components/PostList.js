import React, { Component } from 'react'
import PostListContent from './PostListContent'
import PropTypes from 'prop-types'
import { CardColumns, Alert } from 'reactstrap'

class PostList extends Component {
  /*
   * Defining the props for this component
   */
  static propTypes = {
    postList: PropTypes.array
  }
  render() {
    const { postList } = this.props
    return(
       <div className="post-list">
        <CardColumns>
          {postList.length > 0 ? postList.map((post) => (
            <PostListContent key={post.id} post={post} />
          )) :
            <Alert color="warning">No posts found</Alert>
          }
        </CardColumns>
      </div>
    )
  }
}
export default PostList
