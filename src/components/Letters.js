import React, { Component } from 'react';
import Letter from './Letter';

class Letters extends Component {

    generateLetterTags(letterStatus) {
        return Object.keys(letterStatus).map(l => {
            return (<Letter key={l} letter={l} />)
        })
    }

    render() {
        return (
            <div>
                <div>Available Letters</div>
                {this.generateLetterTags(this.props.letterStatus)}
            </div>
        );
    }
}

export default Letters;
