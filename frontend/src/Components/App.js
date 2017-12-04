import React, { Component } from 'react';
import { fetchCategories } from '../Actions/Categories'
import { fetchPosts } from '../Actions/Posts';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import PostList from './PostList';
import PostNew from './PostNew';
import PostSingle from './PostSingle';
import List from './List';
import { Route } from 'react-router-dom';

class App extends Component {

  state = {
    categories: null,
    posts: null
  }
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <Route exact path="/" component={ List }  />
        <Route path="/category/:category/" component={ List } />
        <Route path="/post/:slug/:id/" component={ PostSingle } />
        <Route exact path="/new" component={ PostNew } />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({categories, posts}) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
