import React, { Component } from 'react'
import { fetchPosts } from '../Actions/Posts'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import PostNew from './PostNew'
import PostSingle from './PostSingle'
import List from './List'
import { Route } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.getPosts()
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={ List }  />
        <Route path="/category/:category/" component={ List } />
        <Route path="/post/:slug/:id/" component={ PostSingle } />
        <Route exact path="/new" component={ PostNew } />
        <Footer />
      </div>
    );
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
)(App)
