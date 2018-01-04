import React, { Component } from 'react'
import { Alert } from 'reactstrap'

class Errors extends Component {

  render() {
    const { notices } = this.props
    return (
      <Alert color="danger">
        <strong>{notices.length} {notices.length === 1 ? 'error found' : 'errors found'}:</strong>
        {notices.map((notice) => (
          <div key={notice}>{notice}</div>
        ))}
      </Alert>

    )
  }
}

export default Errors
