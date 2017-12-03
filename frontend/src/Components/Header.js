import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <span className="logo">
          <Link to="/">Udacity Readable Project</Link>
        </span>
      </header>
    )
  }
}
export default Header
