import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import PostInfo from './PostInfo'
import PostActions from './PostActions'
import PostVote from './PostVote'
import Loading from './Loading'
import NotFound from './NotFound'
import { Row, Col, Alert, Container } from 'reactstrap'
import '../Assets/styles/single.css'

class PostSingle extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  /**
   * @description Generate the HTML
   * @param {string} Post content
   * @return {string} HTML for post content
   */
  createMarkup(body) {
    return {__html: body};
  }

  render() {
    const { loadingPosts, currentPost } = this.props
    console.log(currentPost.length === 'undefined')
    if(loadingPosts) {
      return (<Loading />)
    } else {
      if(!currentPost.hasOwnProperty('id')) {
        return (<NotFound />)
      }
      if(!currentPost.hasOwnProperty('id') || currentPost.deleted) {
        return (<Container><Alert color="warning">Post deleted</Alert></Container>)
      } else {
        return (
          <article className="post-single">
            <div className="entry-post-single">
              <div className="post-single-hero">
                <div className="post-list-image" />
                <PostVote post={currentPost} />
                <div className="post-single-overlay" />
                  <div className="post-single-header">
                    <Container>
                      <h1 className="post-single-title">{ currentPost.title }</h1>
                      <PostInfo post={currentPost} />
                    </Container>
                  </div>
              </div>
              <div className="post-single-content">
                <Container>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <div dangerouslySetInnerHTML={this.createMarkup(currentPost.body)} />
                      <PostActions post={currentPost} />
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="post-single-footer">
                <Container>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <CommentForm parentId={currentPost.id} formStatus="new" />
                      <CommentList commentCount={ currentPost.commentCount } parentId={currentPost.id} />
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </article>
        )
      }
    }
  }
}

function mapStateToProps({ currentPost, loadingPosts }) {
  return {
    currentPost,
    loadingPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentPost: (id) => dispatch(fetchSinglePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingle)
