import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Navigation extends Component {
  render() {
    const { categories } = this.props
    return(
      <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {categories.length > 0 && categories.map(category =>
            <li key={category.name}>
              <Link to={`/category/${category.path}`}>{category.name}</Link>
            </li>
        )}
      </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(
  mapStateToProps
)(Navigation)
