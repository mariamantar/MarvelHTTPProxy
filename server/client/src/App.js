import React, { Component } from 'react';
import Characters from './components/characters';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="search-title"> Search Marvel Characters </h1>
        <Characters />
      </div>
    );
  }
}

export default App;
