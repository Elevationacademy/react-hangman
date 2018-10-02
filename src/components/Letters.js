import React, { Component } from 'react';
// import '../App.css';
import Letter from './Letter';

class Letters extends Component {
  render() {
    return (
      <div>
        { this.generateLetterTags(this.props.letterStatus) }
      </div>
    );
  }

  generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter 
          key={l} 
          letter={l} 
          selectLetter={this.props.selectLetter} 
          className={letterStatus[l] ? "selected" : null } />)
    })
}

}

export default Letters;
