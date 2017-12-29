import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePostOrder } from '../Actions/Posts'
import { FormGroup, Label, Input } from 'reactstrap';


class PostListOrder extends Component {

  handleSortOrder(value) {
    const { sortPost } = this.props
    sortPost(value)
  }

  render() {
    return (
      <div className="sort-list-order">
        <FormGroup>
          <Label for="sortOrder">Order by</Label>
          <Input type="select" name="sortOrder" id="sortOrder" onChange={(e) => this.handleSortOrder(e.target.value)}>
            <option value="timestamp">Date</option>
            <option value="voteScore">Score</option>
            <option value="title">Title</option>
          </Input>
        </FormGroup>
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

