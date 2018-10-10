import React, { Component } from 'react';
import Letters from './components/Letters';
import './App.css';
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