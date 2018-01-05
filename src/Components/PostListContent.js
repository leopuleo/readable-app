import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import truncate from 'truncate'
import PostInfo from './PostInfo'
import PostActions from './PostActions'
import PostVote from './PostVote'
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'

class PostListContent extends Component {

  render() {
    const { post } = this.props
    const slug = '/' + post.category + '/' + post.id + '/'
    return(
      <Col className="post-list-col" xs="12" sm="6">
        <Card className="post-list-content">
          <div className="post-list-header">
            <div className="post-list-image" />
            <PostVote post={post} />
          </div>
          <CardBody>
            <CardTitle><Link to={ slug }>{ post.title }</Link></CardTitle>
            <CardText className="post-list-text">{ truncate(post.body, 60) }</CardText>
            <div className="card-text">
              <small className="text-muted">
                <Row>
                  <Col xs="6" sm="8">
                    <PostInfo post={post} />
                  </Col>
                  <Col xs="6" sm="4">
                    <PostActions post={post} />
                  </Col>
                </Row>
              </small>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default PostListContent
