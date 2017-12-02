import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostList extends Component {
  render() {
    const { posts } = this.props
    return(
       <div className="post-list">
        {posts.length > 0 && posts.map((post) => (
          <div key={post.id}>
            {post.title}
          </div>
        ))}
       </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps
)(PostList)
