import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSinglePost } from '../Actions/Posts'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'reactstrap'

class PostActions extends Component {

  /*
   * Defining the props for this component
   */
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  /**
   * @description Handle post deletion
   * @param {string} Post id to delete
   */
  handleDeletePost(id){
    const { deleteCurrentPost } = this.props
    deleteCurrentPost(id)
  }

  render() {
    const { postId } = this.props
    return(
      <ButtonGroup className="entry-tools">
        <Button color="link" tag={Link} to={`/edit/${postId}`}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button color="link" onClick={() => this.handleDeletePost(postId)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
      </ButtonGroup>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCurrentPost: (id) => dispatch(deleteSinglePost(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostActions)
