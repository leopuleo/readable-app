import React, { Component } from 'react'
import { Container, Alert } from 'reactstrap'

class Loading extends Component {
  render() {
    return (<Container><Alert color="warning">Loading...</Alert></Container>)
  }
}

export default Loading
