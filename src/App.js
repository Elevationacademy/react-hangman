import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Letters from './components/Letters';
import Letter from './components/Letter';
import Score from './components/Score';

class App extends Component {
  render() {
    return (
      <div>
        <Score />
        <Letters />
      </div>
      
    );
  }
}

export default App;
