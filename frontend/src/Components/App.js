import React, { Component } from 'react';
import { fetchCategories } from '../Actions/Categories'
import { fetchPosts } from '../Actions/Posts';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

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
