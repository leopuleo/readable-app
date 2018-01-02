import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
import { Link } from 'react-router-dom'
import truncate from 'truncate'
import striptags from 'striptags'
import PostInfo from './PostInfo'
import PostActions from './PostActions'
import PostVote from './PostVote'
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'

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
    return(
      <Card className="post-list-content">
        <div className="post-list-header">
          <div className="post-list-image" />
          <PostVote post={post} />
        </div>
        <CardBody>
          <CardTitle><Link to={ slug }>{ post.title }</Link></CardTitle>
          <CardText className="post-list-text">{ truncate(striptags(post.body), 200) }</CardText>
          <CardText >
            <small className="text-muted">
              <Row>
                <Col xs="6" sm="8">
                  <PostInfo post={post} />
                </Col>
                <Col xs="6" sm="4">
                  <PostActions postId={post.id} />
                </Col>
              </Row>
            </small>
          </CardText>
        </CardBody>
      </Card>
    )
  }
}

export default PostListContent
