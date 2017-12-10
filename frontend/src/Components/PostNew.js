import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import sentenceCase from 'sentence-case'
import Errors from './Errors'
import { createNewPost } from '../Actions/Posts'
import { Link } from 'react-router-dom'
import slug from 'slug'

class PostNew extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: uuidv1(),
      title: '',
      timestamp: moment().unix(),
      body: '',
      author: '',
      category: '',
      errors: [],
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
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
    const { sendNewPost } = this.props
    const { error } = this.state
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {
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

  /**
   * @description Generate the slug for post url from string
   * @param {string} string to slug
   */
  slugifyPost(string) {
    return slug(string, {
      lower: true
    })
  }

  render() {
    const { categories } = this.props
    const { errors, success, id, title } = this.state
    const slug = '/post/' + this.slugifyPost(title) + '/' + id + '/'
    return (
      <div className="post-new">
        <Container>
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
                  <Input type="select" name="selectCategory" id="selectCategory" value={this.state.category} onChange={e => this.setState({ category: e.target.value })}>
                    <option value="">-- Select a category --</option>
                    {categories.length > 0 && categories.map((category) => (
                      <option value={category.path} key={category.path}>{sentenceCase(category.name)}</option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="author">Author</Label>
                  <Input type="text" name="author" id="author" placeholder="Insert the author name"  value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
                </FormGroup>

                <Button color="primary" size="lg" block>Save post</Button>
              </Col>
            </Row>
          </Form>
         </Container>
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
    sendNewPost: (post) => dispatch(createNewPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostNew)
