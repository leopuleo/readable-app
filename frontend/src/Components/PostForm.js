import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import sentenceCase from 'sentence-case'
import Errors from './Errors'
import { createNewPost, updateSinglePost } from '../Actions/Posts'
import { Link } from 'react-router-dom'
import slug from 'slug'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class PostForm extends Component {

  constructor(props) {
    super(props)
    const { currentPost } = props
    this.state = {
      id: currentPost ? currentPost.id : uuidv1(),
      title: currentPost ? currentPost.title : '',
      timestamp: currentPost ? currentPost.timestamp : moment().valueOf(),
      body: currentPost ? currentPost.body : '',
      author: currentPost ? currentPost.author : '',
      category: currentPost ? currentPost.category : '',
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
    currentPost: PropTypes.object
  }

  handleValidation = (values) => {
    let errors = []
    if (!values.title || values.title.trim() === '') {
      errors.push('Enter a Title')
    }
    if (!values.body || values.body.trim() === '') {
      errors.push('Enter the body')
    }
    if(!values.author || values.author.trim() === '') {
      errors.push('Enter the author name')
    }
    if(!values.category || values.category.trim() === '') {
      errors.push('Select a category')
    }
    return errors
  }

  handleSubmit = (e) => {
    const {  formStatus, sendNewPost, updatePost } = this.props
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {

      if(formStatus === 'edit') {
        updatePost({
          id: this.state.id,
          title: this.state.title,
          body: this.state.body
        }).then(() => {
          this.setState({ success: true })
        })
      } else {
        sendNewPost({
          id: this.state.id,
          timestamp: this.state.timestamp,
          title: this.state.title,
          body: this.state.body,
          author: this.state.author,
          category: this.state.category
        }).then(() => {
          this.setState({ success: true })
        })
      }
    }
  }

  /**
   * @description Generate the slug for post url from string
   * @param {string} string to slug
   */
  slugifyPost(string) {
    if(string) {
      return slug(string, {
        lower: true
      })
    }
  }

  render() {
    const { categories, formStatus } = this.props
    const { errors, success, id, title } = this.state
    const slug = '/post/' + this.slugifyPost(title) + '/' + id + '/'
    let disabled = formStatus === 'edit' ? {'disabled' : 'disabled'} : {};
    return (
      <div className="post-new">
        { errors.length > 0 ? <Errors notices={errors} /> : '' }
        { success ?
          <Alert color="success">Post saved. Visit the <Link to={ slug }>post</Link></Alert>
        : ''}
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="title" hidden>Title</Label>
                <Input type="text" name="title" id="postTitle" placeholder="Insert the post title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
              </FormGroup>
              { title ?
                <small><strong>Slug:</strong> {slug}</small>
              : '' }
            </Col>
          </Row>
          <Row>
            <Col sm="9">
              <Editor
                initialValue={this.state.body}
                onChange={e => this.setState({ body: e.target.getContent() })}
                init={{
                  plugins: 'link image code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
                }}
              />
            </Col>
            <Col sm="3">

              <FormGroup>
                <Label for="selectCategory">Select a category</Label>
                <Input {...disabled} type="select" name="selectCategory" id="selectCategory" value={this.state.category} onChange={e => this.setState({ category: e.target.value })}>
                  <option value="">-- Select a category --</option>
                  {categories.length > 0 && categories.map((category) => (
                    <option value={category.path} key={category.path}>{sentenceCase(category.name)}</option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup >
                <Label for="author">Author</Label>
                <Input {...disabled} type="text" name="author" id="author" placeholder="Insert the author name"  value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
              </FormGroup>

              <Button color="primary" size="lg" block>Save post</Button>
            </Col>
          </Row>
        </Form>
      </div>
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
    sendNewPost: (post) => dispatch(createNewPost(post)),
    updatePost: (post) => dispatch(updateSinglePost(post))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm))
