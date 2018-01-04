import React, { Component } from 'react'
import sentenceCase from 'sentence-case'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

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
      <div className="page-title">
        <Container>
          <h1>{ title ? sentenceCase(title) : 'Home' }</h1>
        </Container>
      </div>
    )
  }
}
export default PageTitle
