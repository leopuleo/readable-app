import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import PostNew from './PostNew'
import PostEdit from './PostEdit'
import PostSingle from './PostSingle'
import List from './List'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/" component={ List }  />
            <Route path="/category/:category/" component={ List } />
            <Route path="/post/:slug/:id/" component={ PostSingle } />
            <Route exact path="/new" component={ PostNew } />
            <Route exact path="/edit/:id" component={ PostEdit } />
          </Switch>
        <Footer />
      </div>
    );
  }
}


export default App
