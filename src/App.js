import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

import Company from './Container/Company/Company';
import Office from './Container/Office/Office';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            
            <Route path='/' exact component={Company}/>
            <Route path='/office' exact component={Office}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
