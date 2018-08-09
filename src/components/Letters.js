import React, { Component } from 'react';
// import '../App.css';
import Letter from './Letter';

class Letters extends Component {
  render() {
    return (
      <Letter></Letter>
    );
  }

  generateLetterStatuses() {
      let letterStatus = {};
      for (let i = 65; i < 91; i++) {
          letterStatus[String.fromCharCode(i)] = false;
      }
      return letterStatus;
  }
}

export default Letters;
