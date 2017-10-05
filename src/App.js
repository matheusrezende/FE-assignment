import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import firebase from 'firebase'
import { Provider } from 'react-redux'

import history from './config/history'
import store from './config/store'
import { FIREBASE_AUTH } from './config/apiKeys'

import RootView from './components/RootView'
import AddressList from './components/AddressList'
import AddressCreate from './components/AddressCreate'
import AddressUpdate from './components/AddressUpdate'

class App extends Component {
  componentWillMount () {
    firebase.initializeApp(FIREBASE_AUTH)
  }
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/'>
            <RootView history={history}>
              <Route exact path='/' component={AddressList} />
              <Route exact path='/address' component={AddressCreate} />
              <Route exact path='/address/:id' component={AddressUpdate} />
            </RootView>
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default App
