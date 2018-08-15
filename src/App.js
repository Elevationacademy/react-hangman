import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Letters from './components/Letters';
import Letter from './components/Letter';
import Score from './components/Score';
import Solution from './components/Solution';

class App extends Component {

  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      score: 100
    }
  }

  generateLetterStatuses() {
    let letterStatus = {};
    for (let i = 65; i < 91; i++) {
        letterStatus[String.fromCharCode(i)] = false;
    }
    return letterStatus;
}

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Solution letterStatus={this.state.letterStatus} />
        <Letters letterStatus={this.state.letterStatus} />
        <button onClick={this.deleteLetter}>Remove First</button>
        {/* Placeholder for Exercise 4  */}
        <button id="dummyButton" onClick={this.reduceScore}></button>
      </div>
      
    );
  }

  deleteLetter = () => {
    let letterStatus = this.state.letterStatus;
    const letters = Object.keys(letterStatus);
    delete letterStatus[letters[0]];
    this.setState({ letterStatus: letterStatus });
  }

  reduceScore = () => {
    let currentScore = this.state.score - 10;
    this.setState({ score: currentScore});
  }
}

export default App;
