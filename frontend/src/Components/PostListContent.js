import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
import { Link } from 'react-router-dom'

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
    return(
       <article className="post-list-content">
          <Link to={ slug }>
            <header className="entry-header">
              <h2>{ post.title }</h2>
            </header>
          </Link>
       </article>
    )
  }
}

export default PostListContent
