import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { createNewComment, updateSingleComment, setEditingComment } from '../Actions/Comments'
import Errors from './Errors'

class CommentForm extends Component {

  constructor(props) {
    super(props)
    const { parentId, currentComment } = props
    this.state = {
      id: currentComment ? currentComment.id : uuidv1(),
      timestamp: currentComment ? currentComment.timestamp : moment().valueOf(),
      body: currentComment ? currentComment.body : '',
      author: currentComment ? currentComment.author : '',
      parentId: parentId,
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  /**
   * @description Handle Comment Validation
   * @param {array} Comment values
   * @return {array} Errors
   */
  handleValidation = (values) => {
    let errors = []
    if(!values.author || values.author.trim() === '') {
      errors.push('Enter your name')
    }
    if (!values.body || values.body.trim() === '') {
      errors.push('Enter your comment')
    }
    return errors
  }

  /**
   * Resetting the state
   */
  resetState = () => {
    const { parentId } = this.props
    this.setState({
      id: uuidv1(),
      timestamp: moment().valueOf(),
      body: '',
      author: '',
      parentId: parentId,
      errors: []
    })
  }

  /**
   * Handling Comment form submission
   */
  handleSubmit = (e) => {
    const { formStatus, sendNewComment, sendUpdateComment, editCommentStatus } = this.props
    const { id, timestamp, body, author, parentId } = this.state
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {
      if(formStatus === 'edit') {
        sendUpdateComment({
          id: id,
          body: body,
        }).then(() => {
          this.resetState()
          editCommentStatus(false)
        })
      } else {
        sendNewComment({
          id: id,
          timestamp: timestamp,
          body: body,
          author: author,
          parentId: parentId
        }).then(() => {
          this.resetState()
        })
      }
    }
  }

  render() {
    const { errors, author, body } = this.state
    const { formStatus } = this.props
    const disabled = formStatus === 'edit' ? {'disabled' : 'disabled'} : {}
    return (
      <div className="comment-form">
        { formStatus === 'new' ? <h3 className="comment-form-title">Leave a comment</h3> : '' }
        { errors.length > 0 ? <Errors notices={errors} /> : '' }
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="commentAuthor">Author</Label>
            <Input {...disabled} type="text" name="commentAuthor" id="commentAuthor" placeholder="Enter your name" value={ author } onChange={e => this.setState({ author: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="commentBody">Comment</Label>
            <Input type="textarea" name="commentBody" id="commentBody" placeholder="Enter your comment" value={ body } onChange={e => this.setState({ body: e.target.value })} />
          </FormGroup>
          <Button outline color="success">Submit</Button>
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
)(CommentForm)
