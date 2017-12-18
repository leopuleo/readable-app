import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import moment from 'moment'
import PostSingleComments  from './PostSingleComments'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'


class PostSingle extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  createMarkup(body) {
    return {__html: body};
  }

  render() {
    const { currentPost, match} = this.props
    const postDate = moment(currentPost.timestamp).format("DD/MM/YYYY");
    return (
      <article className="single-post">
        <div className="container">
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
            <PostSingleComments postId={match.params.id}/>
            <Link to={`/edit/${currentPost.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
          </footer>
        </div>
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
    getCurrentPost: (id) => dispatch(fetchSinglePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSingle)
