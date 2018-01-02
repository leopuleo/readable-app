import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import sentenceCase from 'sentence-case'

class PostInfo extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props
    const postDate = moment(post.timestamp).format("DD/MM/YYYY")
    return(
      <div className="post-info">
        Written by { post.author } in <Link to={`/category/${post.category}/`}>{ sentenceCase(post.category) }</Link> - { postDate }
      </div>
    )
  }
}
export default PostInfo
