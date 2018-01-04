import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import sentenceCase from 'sentence-case'

class PostInfo extends Component {

  render() {
    const { post } = this.props
    const postDate = moment(post.timestamp).format("DD/MM/YYYY")
    return(
      <div className="post-info">
        <div className="post-author">Written by { post.author } in <Link to={`/category/${post.category}/`}>{ sentenceCase(post.category) }</Link></div>
        <div className="post-date">Published on { postDate }</div>
      </div>
    )
  }
}

export default PostInfo
