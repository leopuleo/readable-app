import React, { Component } from 'react'
import { fetchPosts } from '../Actions/Posts'
import { connect } from 'react-redux'
import PostList from './PostList'
import Banner from './Banner'

class List extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  /**
   * @description Generate the list of posts
   * @param {array} posts -List of posts
   * @param {string} category - The selected category
   */
  generatePostList(posts, category) {
    return category ? posts.filter((post) => (
      post.category === category
    )) : posts
  }

  render() {
    const { match, posts } = this.props
    const postList = this.generatePostList(posts, match.params.category)
    return (
      <div className="list">
      <Banner title={ match.params.category } />
      <PostList postList={ postList } />
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
