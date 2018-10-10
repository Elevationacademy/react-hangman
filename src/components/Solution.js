import React, { Component } from 'react';
import Letter from './Letter';

class Solution extends Component {

    constructor() {
        super()
        this.state = {
            word: "CALM",
            hint: "Your mood right now"
        }
    }

    generateLetterTags() {
        return this.state.word.split("").map(l => {
            return (<Letter key={l} letter={l} />)
        })
    }

    render() {
        return (
            <div>
                <div>{this.state.hint}</div>
                <span>{this.generateLetterTags()}</span>
            </div>
        );
    }
}

export default Solution;
