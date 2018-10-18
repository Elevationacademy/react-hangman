import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../src/App';
import Letters from '../../src/components/Letters';
import Letter from '../../src/components/Letter';
import Score from '../../src/components/Score';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

it('Application should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('When the score is 0 or less, the game should have a "restart game" button with the class "restart-game"', () => {
    const wrapper = mount(<App />);
    wrapper.setState({score: 0})
    expect(wrapper.find('.restart-game')).toHaveLength(1)
    
});

it('When the user selects all the correct letters, the game should have a "restart game" button with the class "restart-game"', () => {
    const wrapper = mount(<App />);
    const wordLetters = wrapper.state('word').split("")
    let letterStatus = {...wrapper.state('letterStatus')}
    
    wordLetters.forEach(wl => letterStatus[wl] = true)
    
    wrapper.setState({letterStatus})      
    expect(wrapper.find('.restart-game')).toHaveLength(1)

});

it('When the user selects all the correct letters, the game should provide a new word (in state) when clicking the restart button', () => {
    const wrapper = mount(<App/>);

    const wordLetters = wrapper.state('word').split("")
    let letterStatus = {...wrapper.state('letterStatus')}
    wordLetters.forEach(wl => letterStatus[wl] = true)
    wrapper.setState({letterStatus})

    const restartButton = wrapper.find('.restart-game');
    let oldWord = wrapper.state('word');
    restartButton.prop('onClick')()

    let newWord = wrapper.state('word');
    expect(oldWord).not.toEqual(newWord);
});

it('When the user selects all the correct letters, the game should provide a new hint (in state) when clicking the restart button', () => {
    const wrapper = mount(<App/>);

    const wordLetters = wrapper.state('word').split("")
    let letterStatus = {...wrapper.state('letterStatus')}
    wordLetters.forEach(wl => letterStatus[wl] = true)
    wrapper.setState({letterStatus})

    const restartButton = wrapper.find('.restart-game');
    let oldWord = wrapper.state('hint');
    restartButton.prop('onClick')()

    let newWord = wrapper.state('hint');
    expect(oldWord).not.toEqual(newWord);
});

it('When the score is 0 or less, the game should provide a new word (in state) when clicking the restart button', () => {
    const wrapper = mount(<App/>);
    wrapper.setState({score: 0})

    const restartButton = wrapper.find('.restart-game');
    // TODO; what happens if students use the words state property for multiple words..
    let oldWord = wrapper.state('word');
    restartButton.prop('onClick')()

    let newWord = wrapper.state('word');
    expect(oldWord).not.toEqual(newWord);
});

it('When the score is 0 or less, the game should provide a new hint (in state) when clicking the restart button', () => {
    const wrapper = mount(<App/>);
    wrapper.setState({score: 0})

    const restartButton = wrapper.find('.restart-game');
    let oldWord = wrapper.state('hint');
    restartButton.prop('onClick')()

    let newWord = wrapper.state('hint');
    expect(oldWord).not.toEqual(newWord);
});