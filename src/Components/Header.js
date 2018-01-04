import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sentenceCase from 'sentence-case'
import { fetchCategories } from '../Actions/Categories'
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink, Button, Container } from 'reactstrap'
import '../Assets/styles/header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    this.props.getCategories()
  }
  render() {
    const { categories } = this.props
    return (
      <header className="site-header">
          <Navbar color="faded" light expand="md">
            <Container>
              <NavbarBrand tag={Link} to="/">Readable</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem key='home'>
                    <NavLink tag={Link} to="/">Home</NavLink>
                  </NavItem>
                  {categories.length !== 0 && categories.map((category) => (
                    <NavItem key={category.path}>
                      <NavLink tag={Link} to={`/category/${category.path}/`}>{sentenceCase(category.name)}</NavLink>
                    </NavItem>
                  ))}
                  <NavItem  key='new'>
                    <Button tag={Link} to="/new" outline color="success" className="btn-new-post">New post</Button>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
      </header>
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
)(Header)
