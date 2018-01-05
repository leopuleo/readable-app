import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import sentenceCase from 'sentence-case'
import Errors from './Errors'
import { createNewPost, updateSinglePost } from '../Actions/Posts'
import { Link, withRouter } from 'react-router-dom'
import slug from 'slug'

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

  /**
   * @description Handle post values Validation
   * @param {array} Comment values
   * @return {array} Errors
   */
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

  /**
   * Handling Post form submission
   */
  handleSubmit = (e) => {
    const { formStatus, sendNewPost, updatePost } = this.props
    const { id, timestamp, title, body, author, category } = this.state
    e.preventDefault()
    let errors = this.handleValidation(this.state)
    this.setState({ errors: errors })
    if(errors.length === 0) {
      if(formStatus === 'edit') {
        updatePost({
          id: id,
          title: title,
          body: body
        }).then(() => {
          this.setState({ success: true })
        })
      } else {
        sendNewPost({
          id: id,
          timestamp: timestamp,
          title: title,
          body: body,
          author: author,
          category: category
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
    const { errors, success, id, title, body, category, author } = this.state
    const slug = '/post/' + category + '/' + this.slugifyPost(title) + '/' + id + '/'
    const disabled = formStatus === 'edit' ? {'disabled' : 'disabled'} : {}
    return (
      <div className="post-form">
        { errors.length > 0 ? <Errors notices={errors} /> : '' }
        { success ?
          <Alert color="success">Post saved. Visit the <Link to={ slug }>post</Link>.</Alert>
        : ''}
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs="12" md="12">
              <FormGroup>
                <Label for="title" hidden>Title</Label>
                <Input type="text" name="title" id="postTitle" placeholder="Enter the post title" value={ title } onChange={e => this.setState({ title: e.target.value })} />
                { title ?
                  <small><strong>Link preview:</strong> { window.location.protocol + '//' + window.location.host + slug }</small>
                : '' }
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="9">
              <FormGroup>
                <Label for="body" hidden>Body</Label>
                <Input type="textarea" name="body" id="body" placeholder="Enter the post body" value={ body } onChange={e => this.setState({ body: e.target.value })} style={{ height: 300 }} />
              </FormGroup>
            </Col>
            <Col xs="12" md="3">
              <FormGroup>
                <Label for="selectCategory">Category</Label>
                <Input {...disabled} type="select" name="selectCategory" id="selectCategory" value={ category } onChange={e => this.setState({ category: e.target.value })}>
                  <option value="">-- Select a category --</option>
                  {categories.length > 0 && categories.map((category) => (
                    <option value={category.path} key={category.path}>{sentenceCase(category.name)}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup >
                <Label for="author">Author</Label>
                <Input {...disabled} type="text" name="author" id="author" placeholder="Enter the post author"  value={ author } onChange={e => this.setState({ author: e.target.value })} />
              </FormGroup>
              <Button color="success" size="lg" block>Save post</Button>
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
