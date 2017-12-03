import React, { Component } from 'react';
import sentenceCase from 'sentence-case'

class Banner extends Component {
  render() {
    const { title } = this.props
    return (
      <header className="banner">
       <h1>{ title ?  sentenceCase(title) : 'Home'  }</h1>
      </header>
    )
  }
}
export default Banner
