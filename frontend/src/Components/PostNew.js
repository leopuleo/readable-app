import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class PostNew extends Component {
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }
  render() {
    return (
      <div className="post-new">
         <Container>
          <Form>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="title" hidden>Title</Label>
                  <Input type="text" name="title" id="postTitle" placeholder="Insert the post title" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="9">
                <Editor
                  initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
                  }}
                  onChange={this.handleEditorChange}
                />
              </Col>
              <Col sm="3">
                Varie
              </Col>
            </Row>
          </Form>
         </Container>
      </div>
    )
  }
}

export default PostNew
