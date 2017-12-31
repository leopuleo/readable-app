import React, { Component } from 'react'
import { Alert } from 'reactstrap'

class Errors extends Component {
  render() {
    const { notices } = this.props
    return (
      <Alert color="danger">
        {notices.map((notice) => (
          <div key={notice}>{notice}</div>
        ))}
      </Alert>

    )
  }
}

export default Errors
