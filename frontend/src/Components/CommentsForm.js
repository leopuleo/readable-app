import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { createNewComment, updateSingleComment, setEditingComment } from '../Actions/Comments'
import Errors from './Errors'

class CommentsForm extends Component {

  constructor(props) {
    super(props)
    const { postId, currentComment } = props
    this.state = {
      id: currentComment ? currentComment.id : uuidv1(),
      timestamp: currentComment ? currentComment.timestamp : moment().valueOf(),
      body: currentComment ? currentComment.body : '',
      author: currentComment ? currentComment.author : '',
      parentId: postId,
      errors: []

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.resetState = this.resetState.bind(this)
  }


  /*
   * Defining the props for this component
   */
  static propTypes = {
    formStatus: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    currentComment: PropTypes.object
  }

  handleValidation = (values) => {
    let errors = []
    if (!values.body || values.body.trim() === '') {
      errors.push('Enter the body')
    }
    if(!values.author || values.author.trim() === '') {
      errors.push('Enter the author name')
    }
    return errors
  }

  resetState = () => {
    const { postId } = this.props
    this.setState({
      id: uuidv1(),
      timestamp: moment().valueOf(),
      body: '',
      author: '',
      parentId: postId,
      errors: []
    })
  }

  handleSubmit = (e) => {
    const {  formStatus, sendNewComment, sendUpdateComment, editCommentStatus } = this.props
    editCommentStatus(true)
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {
      if(formStatus === 'edit') {
        sendUpdateComment({
          id: this.state.id,
          body: this.state.body,
        }).then(() => {
          this.resetState()
          editCommentStatus(false)
        })
      } else {
        sendNewComment({
          id: this.state.id,
          timestamp: this.state.timestamp,
          body: this.state.body,
          author: this.state.author,
          parentId: this.state.parentId
        }).then(() => {
          this.resetState()
        })
      }
    }
  }

  render() {
    const { errors } = this.state
    return (
      <div className="comments-form">
        { errors.length > 0 ? <Errors notices={errors} /> : '' }
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="commentAuthor">Author</Label>
            <Input type="text" name="commentAuthor" id="commentAuthor" placeholder="Enter your name" value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="commentBody">Comment</Label>
            <Input type="textarea" name="commentBody" id="commentBody" placeholder="Enter your comment" value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ editingComment }) {
  return {
    editingComment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendNewComment: (comment) => dispatch(createNewComment(comment)),
    sendUpdateComment: (comment) => dispatch(updateSingleComment(comment)),
    editCommentStatus: (status) => dispatch(setEditingComment(status))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsForm)
