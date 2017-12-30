import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
import { Link } from 'react-router-dom'
import truncate from 'truncate'
import striptags from 'striptags'
import moment from 'moment'

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
       <article className="post-list-content">
        <div className="entry-image"></div>
        <header className="entry-header">
          <h2><Link to={ slug }>{ post.title }</Link></h2>
          <time className="updated" dateTime="{ postDate }">{ postDate }</time>
        </header>
        <div className="entry-content">
          { truncate(striptags(post.body), 200) }
        </div>
       </article>
    )
  }
}

export default PostListContent
