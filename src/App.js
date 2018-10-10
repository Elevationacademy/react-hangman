import React, { Component } from 'react';
import Letters from './components/Letters';
import './App.css';
import Score from './components/Score';
import Solution from './components/Solution';

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatus(),
      score: 100
    }
  }

  generateLetterStatus() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
  }

  deleteLetter = () => {
    let letterStatus = {...this.state.letterStatus}
    const letters = Object.keys(letterStatus)
    delete letterStatus[letters[0]]

    this.setState({ letterStatus: letterStatus })
  }

  reduceScore = () => {
    this.setState({ score: this.state.score - 10 })
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Solution letterStatus={this.state.letterStatus} />
        <Letters letterStatus={this.state.letterStatus} />
      </div>
    );
  }
}

export default App;
