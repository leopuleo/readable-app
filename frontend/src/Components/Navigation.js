import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../Actions/Categories'

class Navigation extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

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
              <Link to={`/category/${category.path}/`}>{category.name}</Link>
            </li>
        )}
      </ul>
      </nav>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
