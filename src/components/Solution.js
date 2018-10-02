import React, { Component } from 'react';
import Letter from './Letter';


class Solution extends Component {
  render() {
    return (
      <div>
                  {/* Exercise 3 goes inside the following div */}
        <div className="word">{this.generateLettersDisplay(this.props.word)}</div>
        <div className="hint">{this.props.hint}</div>
      </div>
       
    );
  }

  generateLettersDisplay(word) {
    return word.split('').map((l, i) => {
        return <Letter
         key={i} 
         letter={this.props.letterStatus[l.toUpperCase()] ? l : '_ '}
         className='solutionLetter'></Letter>
    });
  }
}

export default Solution;
