import React, { Component } from 'react'
import Header from './Header'
import PostNew from './PostNew'
import PostEdit from './PostEdit'
import PostSingle from './PostSingle'
import List from './List'
import NotFound from './NotFound'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="site-content">
          <Switch>
            <Route exact path="/" component={ List }  />
            <Route exact path="/new/" component={ PostNew } />
            <Route exact path="/:category/:id/edit/" component={ PostEdit } />
            <Route exact path="/:category/" component={ List } />
            <Route path="/:category/:id/" component={ PostSingle } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App
