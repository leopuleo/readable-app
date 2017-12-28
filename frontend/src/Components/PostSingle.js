import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost, deleteSinglePost, updateSinglePostVote } from '../Actions/Posts'
import moment from 'moment'
import CommentList from './CommentList'
import CommentsForm from './CommentsForm'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'


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
    const postDate = moment(currentPost.timestamp).format("DD/MM/YYYY");
    return (
      <article className="single-post">
        { currentPost.deleted ? (
          <Alert color="warning">Post deleted</Alert>
        ) : (
        <div className="entry-post">
          <header className="entry-header">
            <h1 className="entry-title">{ currentPost.title }</h1>
            <time className="updated" dateTime="{ postDate }">{ postDate }</time>
            <p className="byline author vcard">By { currentPost.author }</p>
          </header>
          <div className="entry-content" dangerouslySetInnerHTML={this.createMarkup(currentPost.body)} />
          <footer className="entry-footer">
            <p>Votes: { currentPost.voteScore }</p>
            <p>Category: { currentPost.category }</p>
            <p>Comments: { currentPost.commentCount }</p>
            <CommentList postId={match.params.id}/>
            <CommentsForm postId={match.params.id} formStatus="new" />
            <Link to={`/edit/${currentPost.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
            <button onClick={() => this.handleDeletePost(match.params.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
            <button onClick={() => this.handleVotePost(match.params.id, 'upVote')}><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
            <button onClick={() => this.handleVotePost(match.params.id, 'downVote')}><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
          </footer>
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
