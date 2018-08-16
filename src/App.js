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
      score: 100,
      word: 'something',
      hint: 'pretty basic'
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
        <Solution letterStatus={this.state.letterStatus}  word={this.state.word} hint={this.state.hint}/>
        <Letters letterStatus={this.state.letterStatus} selectLetter={this.selectLetter} />
      </div>
      
    );
  }


  selectLetter = (letter) => {
    let letterStatus = this.state.letterStatus;
    letterStatus[letter] = true;
    if (this.state.word.toLowerCase().indexOf(letter.toLowerCase()) > -1) {
      this.state.score = this.state.score + 5;
    }

    else {
      this.state.score = this.state.score - 20;
    }
    this.setState( { letterStatus: letterStatus });
  }

  reduceScore = () => {
    let currentScore = this.state.score - 10;
    this.setState({ score: currentScore});
  }
}

export default App;
