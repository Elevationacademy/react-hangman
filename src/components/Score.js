import React, { Component } from 'react';


class Score extends Component {
  render() {
    return (
      <div className={ this.getScoreClassName() }>Score: {this.props.score}</div>
    );
  }

  getScoreClassName() {
    if (this.props.score >= 80) {
      return "high-score";
    }
    
    else if (this.props.score < 80 && this.props.score >= 50) {
      return "medium-score";
    }

    else {
      return "low-score";
    }
  }
}

export default Score;
