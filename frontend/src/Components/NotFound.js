import React, { Component } from 'react'
import { Alert, Container } from 'reactstrap'

class NotFound extends Component {
  render() {
    return (<Container><Alert color="warning">Not Found</Alert></Container>)
  }
}

export default NotFound
