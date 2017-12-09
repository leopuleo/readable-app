import React, { Component } from 'react'
import PostListContent from './PostListContent'
import PropTypes from 'prop-types'
import PostListNotFound from './PostListNotFound'

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
        <div className="container">
          {postList.length > 0 ? postList.map((post) => (
            <PostListContent key={post.id} post={post} />
          )) :
            <PostListNotFound />
          }
        </div>
      </div>
    )
  }
}

export default PostList
