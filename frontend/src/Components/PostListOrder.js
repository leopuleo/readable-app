import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePostOrder } from '../Actions/Posts'
import { FormGroup, Label, Input, Row,  Col } from 'reactstrap';


class PostListOrder extends Component {

  handleSortOrder(value) {
    const { sortPost } = this.props
    sortPost(value)
  }

  render() {
    return (
      <div className="sort-list-order">
        <Row>
          <Col sm={{ size: 3, offset: 9 }}>
            <FormGroup row >
              <Label for="sortOrder" sm={4}>Order</Label>
              <Col sm={8}>
                <Input type="select" name="sortOrder" id="sortOrder" onChange={(e) => this.handleSortOrder(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="timestamp">Date</option>
                  <option value="voteScore">Score</option>
                  <option value="title">Title</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortPost: (orderBy) => dispatch(updatePostOrder(orderBy))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostListOrder)

