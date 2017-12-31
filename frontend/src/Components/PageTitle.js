import React, { Component } from 'react'
import sentenceCase from 'sentence-case'
import PropTypes from 'prop-types'

class PageTitle extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    const { title } = this.props
    return (
      <header className="page-banner">
       <h1>{ title ? sentenceCase(title) : 'Home' }</h1>
      </header>
    )
  }
}
export default PageTitle
