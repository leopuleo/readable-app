import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostListContent from './PostListContent'

class PostList extends Component {
  render() {
    const { posts, category } = this.props

    const filterList = () => {
      category ? posts.filter((post) => (
        post.category === category
      )) : posts
    }

    return(
       <div className="post-list">
        {filterList.length > 0 && filterList.map((post) => (
          <PostListContent key={post.id} post={post} />
        ))}
       </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps
)(PostList)
