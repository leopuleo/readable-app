import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostListContent extends Component {
  render() {
    const { post } = this.props
    return(
       <div className="post-list-content">
          <div key={post.id}>
            ID: {post.id}<br />
            Title: {post.title}<br />
            Timestamp: {post.timestamp}<br />
            Body: {post.body}<br />
            Author: {post.author}<br />
            Category: {post.category}<br />
            Votescore: {post.voteScore}<br />
            Deleted: {post.deleted}<br />
            CommentCount: {post.commentCount}<br />
             <hr />
          </div>
        ))}
       </div>
    )
  }
}

export default PostListContent
