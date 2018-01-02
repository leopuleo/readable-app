import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost, updateSinglePostVote } from '../Actions/Posts'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import PostInfo from './PostInfo'
import PostActions from './PostActions'
import Loading from './Loading'
import { Row, Col, Alert, Container, ButtonGroup, Button } from 'reactstrap'
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

  /**
   * @description Handle post vote
   * @param {string} Post id to vote
   * @param {string} Vote action: upVote, downVote
   */
  handleVotePost(id, vote) {
    const { updateCurrentPostVote } = this.props
    updateCurrentPostVote(id, vote)
  }

  render() {
    const {loadingPosts, currentPost, match} = this.props
    if(loadingPosts) {
      return (<Loading />)
    } else {
      if(currentPost.deleted) {
        return (<Container><Alert color="warning">Post deleted</Alert></Container>)
      } else {
        return (
          <article className="single-post">
            <div className="entry-single-post">
              <div className="entry-hero">
                <div className="entry-overlay"></div>
                  <div className="entry-header">
                    <Container>
                      <h1 className="entry-title">{ currentPost.title }</h1>
                      <PostInfo post={currentPost} />
                    </Container>
                  </div>
              </div>
              <div className="entry-content">
                <Container>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <div dangerouslySetInnerHTML={this.createMarkup(currentPost.body)} />
                      <PostActions postId={currentPost.id} />
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="entry-footer">
                <Container>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <div className="entry-votes">
                        <h3 className="votes-count">Votes: { currentPost.voteScore }</h3>
                        <ButtonGroup className="votes-tools">
                          <Button color="link" onClick={() => this.handleVotePost(match.params.id, 'upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                          <Button color="link" onClick={() => this.handleVotePost(match.params.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>
                        </ButtonGroup>
                      </div>
                      <CommentForm parentId={match.params.id} formStatus="new" />
                      <CommentList commentCount={ currentPost.commentCount } parentId={match.params.id}/>
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
    getCurrentPost: (id) => dispatch(fetchSinglePost(id)),
    updateCurrentPostVote: (id, vote) => dispatch(updateSinglePostVote(id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingle)
