import React, { Component } from 'react';
import Letter from './Letter';


class Solution extends Component {
  constructor() {
    super();  
    this.state = {
        hint: "it's pretty simple",
        word: 'something'
      }
  }  
  render() {
    return (
      <div>
        {this.state.hint}
        {/* Exercise 3 goes inside the following div */}
        <div className="word">{this.generateLettersDisplay(this.state.word)}</div>
      </div>
       
    );
  }

  generateLettersDisplay(word) {
    return word.split('').map((l, i) => {
        return <Letter key={i} letter={l}></Letter>
    });
  }
}

export default Solution;
