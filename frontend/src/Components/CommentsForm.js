import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input, Alert, FormText } from 'reactstrap'
import { createNewComment } from '../Actions/Comments'
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
      errors: [],
      success: false,

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }


  /*
   * Defining the props for this component
   */
  static propTypes = {
    formStatus: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired
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

  handleSubmit = (e) => {
    const {  formStatus, sendNewComment } = this.props
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {

      if(formStatus === 'edit') {
        alert('what?')
      } else {
        sendNewComment({
          id: this.state.id,
          timestamp: this.state.timestamp,
          body: this.state.body,
          author: this.state.author,
          parentId: this.state.parentId
        }).then(() => {
          this.setState({ success: true })
        })
      }
    }
  }

  render() {
    const { errors, success } = this.state
    return (
      <div className="comments-form">
        { errors.length > 0 ? <Errors notices={errors} /> : '' }
        { success ?
          <Alert color="success">Comment saved</Alert>
        : ''}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="commentAuthor">Author</Label>
            <Input type="text" name="commentAuthor" id="commentAuthor" placeholder="Enter your name" value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="commentBody">Text Area</Label>
            <Input type="textarea" name="commentBody" id="commentBody" value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendNewComment: (comment) => dispatch(createNewComment(comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentsForm)
