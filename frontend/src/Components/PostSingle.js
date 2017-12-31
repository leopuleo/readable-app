import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost, deleteSinglePost, updateSinglePostVote } from '../Actions/Posts'
import moment from 'moment'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import { Row, Col, Alert, Container, ButtonGroup, Button } from 'reactstrap'
import sentenceCase from 'sentence-case'
import '../Assets/styles/single.css'

class PostSingle extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  createMarkup(body) {
    return {__html: body};
  }

  handleDeletePost(id){
    const { deleteCurrentPost } = this.props
    deleteCurrentPost(id)
  }

  handleVotePost(id, vote) {
    const { updateCurrentPostVote } = this.props
    updateCurrentPostVote(id, vote)
  }

  render() {
    const { currentPost, match} = this.props
    const postDate = moment(currentPost.timestamp).format("DD/MM/YYYY")
    return (
      <article className="single-post">
        { currentPost.deleted ? (
          <Alert color="warning">Post deleted</Alert>
        ) : (
        <div className="entry-single-post">
          <div className="entry-hero">
            <div className="entry-overlay"></div>
              <div className="entry-header">
                <Container>
                  <h1 className="entry-title">{ currentPost.title }</h1>
                  <p className="entry-info">Written by { currentPost.author } in <Link to={`/category/${currentPost.category}/`}>{ sentenceCase(currentPost.category) }</Link> - { postDate }</p>
                </Container>
              </div>
          </div>
          <div className="entry-content">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <div dangerouslySetInnerHTML={this.createMarkup(currentPost.body)} />
                  <ButtonGroup className="entry-tools">
                    <Button color="link" tag={Link} to={`/edit/${currentPost.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
                    <Button color="link" onClick={() => this.handleDeletePost(match.params.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                  </ButtonGroup>
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
                      <Button color="link"onClick={() => this.handleVotePost(match.params.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>
                    </ButtonGroup>
                  </div>
                  <CommentForm parentId={match.params.id} formStatus="new" />
                  <CommentList commentCount={ currentPost.commentCount } parentId={match.params.id}/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        )}
      </article>
    )
  }
}

function mapStateToProps({ currentPost }) {
  return {
    currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentPost: (id) => dispatch(fetchSinglePost(id)),
    deleteCurrentPost: (id) => dispatch(deleteSinglePost(id)),
    updateCurrentPostVote: (id, vote) => dispatch(updateSinglePostVote(id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingle)
