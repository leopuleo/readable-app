import React, { Component } from 'react'
import { Container } from 'reactstrap'
import sentenceCase from 'sentence-case'
import PropTypes from 'prop-types'

class Banner extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    const { title } = this.props
    return (
      <Container>
        <header className="banner">
         <h1>{ title ? sentenceCase(title) : 'Home' }</h1>
        </header>
      </Container>
    )
  }
}
export default Banner
