import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
import { Link } from 'react-router-dom'
import truncate from 'truncate'
import striptags from 'striptags'
import moment from 'moment'
import { Col } from 'reactstrap'

class PostListContent extends Component {
  /*
   * Defining the props for this component
   */
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  /**
   * @description Generate the slug for post url from string
   * @param {string} string to slug
   * @return {string} link slug
   */
  slugifyPost(string) {
    return slug(string, {
      lower: true
    })
  }

  render() {
    const { post } = this.props
    const slug = '/post/' + this.slugifyPost(post.title) + '/' + post.id + '/'
    const postDate = moment(post.timestamp).format("DD/MM/YYYY")
    return(
      <Col xs="12" sm="6">
        <article className="post-list-content">
          <div className="post-list-image"></div>
          <header className="post-list-header">
            <h2><Link to={ slug }>{ post.title }</Link></h2>
            <time className="post-list-updated">{ postDate }</time>
          </header>
          <div className="post-list-content">
            { truncate(striptags(post.body), 200) }
          </div>
        </article>
      </Col>
    )
  }
}

export default PostListContent
