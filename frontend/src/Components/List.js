import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import Banner from './Banner';

class List extends Component {

  render() {
    const { match } = this.props
    return (
      <div className="list">
      <Banner title={ match.params.category } />
      <PostList category={ match.params.category } />
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default List
