import React, { Component } from 'react'
import { Alert } from 'reactstrap'

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <Alert color="warning">Loading...</Alert>
      </div>

    )
  }
}

export default Loading
