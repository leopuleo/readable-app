import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <Container>
          Powered by <Link to="https://leonardo.giac.one" target="_blank">leonardo.giac.one</Link>
        </Container>
      </footer>
    )
  }
}

export default Footer;
