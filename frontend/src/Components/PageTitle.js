import React, { Component } from 'react'
import sentenceCase from 'sentence-case'
import { Container } from 'reactstrap'

class PageTitle extends Component {
  render() {
    const { title } = this.props
    return (
      <div className="page-title">
        <Container>
          <h1>{ title ? sentenceCase(title) : '' }</h1>
        </Container>
      </div>
    )
  }
}
export default PageTitle
