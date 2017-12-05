import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSinglePost } from '../Actions/Posts'
import moment from 'moment'

class PostSingle extends Component {

  componentDidMount() {
    const { match, getCurrentPost } = this.props
    getCurrentPost(match.params.id)
  }

  render() {
    const { currentPost } = this.props
    const postDate = moment(currentPost.timestamp).format("DD/MM/YYYY");
    return (

      <article className="single-post">
        <header className="entry-header">
          <h1 class="entry-title">{ currentPost.title }</h1>
          <time class="updated" datetime="{ postDate }">{ postDate }</time>
          <p class="byline author vcard">By { currentPost.author }</p>
        </header>
        <div className="entry-content">{ currentPost.body }</div>
        <footer className="entry-footer">
          <p>Votes: { currentPost.commentCount }</p>
          <p>Category: { currentPost.category }</p>
        </footer>
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
