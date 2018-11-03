import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/Posts';
import Companies from './components/Companies';
import OfficeForm from './components/OfficeForm';
import CompanyForm from './components/CompanyForm';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div style={{ display: 'inline-block', width: '45%' }}>
            <CompanyForm />
          </div>
          <div style={{ display: 'inline-block', width: '45%', marginRight: '20px' }}>
            <OfficeForm />
          </div>
          <Companies />
          {/* <Posts /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
