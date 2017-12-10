import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import PostNew from './PostNew'
import PostSingle from './PostSingle'
import List from './List'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={ List }  />
        <Route path="/category/:category/" component={ List } />
        <Route path="/post/:slug/:id/" component={ PostSingle } />
        <Route exact path="/new" component={ PostNew } />
        <Footer />
      </div>
    );
  }
}


export default App
