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
      score: 30,
      word: 'something',
      hint: 'pretty basic',
      isOver: false,
      isLost: false,
      allWords: ['something', 'some other thing', 'third thing', 'etc'],
      allHints: ['sdsd', 'asdad22222', '1231231231', '1sdsdsdsd'],
      index: 0
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
      if (!this.state.isOver) {
        return (
          <div>
            <Score score={this.state.score} />
            <Solution letterStatus={this.state.letterStatus}  word={this.state.word} hint={this.state.hint}/>
            <Letters letterStatus={this.state.letterStatus} selectLetter={this.selectLetter} />
            <button className="restart-game" onClick={this.restartGame}>Restart Game</button>
        </div>
      )
      }

      else {
        if (this.state.isLost) {
          return (<div className="game-over">Game Over, Bye</div>);
        }
        else {
          return (<div className="success-message">Nice work dude!</div>);
        }
      }
      
  }

  restartGame = () => {
    let currentIndex = this.state.index + 1;
    this.setState({ index: currentIndex, word: this.state.allWords[currentIndex], hint: this.state.allHints[currentIndex] });
  }

  checkGameStatus() {
    if (this.state.word.split('').every((l) => this.state.letterStatus[l.toUpperCase()])) {
      this.setState({ isOver: true });
    }
    else if(this.state.score < 0) {
      this.setState({ isOver: true, isLost: true });
    }
  }


  selectLetter = (letter) => {
    let letterStatus = this.state.letterStatus;
    letterStatus[letter] = true;
    if (this.state.word.toLowerCase().indexOf(letter.toLowerCase()) > -1) {
      this.setState({ score: this.state.score + 5});
    }

    else {
      this.setState({ score: this.state.score - 20});
    }

    this.setState( { letterStatus: letterStatus });
    this.checkGameStatus();
  }

  reduceScore = () => {
    let currentScore = this.state.score - 10;
    let isOver = false;
    if (currentScore <= 0) {
      isOver = true;
    }
    this.setState({ score: currentScore, isOver: isOver});
  }
}

export default App;
