import React, { Component } from 'react'
import sentenceCase from 'sentence-case'
import PropTypes from 'prop-types'

class Banner extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

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
