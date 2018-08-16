import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../src/App';
import Letters from '../src/components/Letters';
import Letter from '../src/components/Letter';
import Score from '../src/components/Score';
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

it('Selecting a correct letter should increase score by 5', () => {
    const word = 'heythere';
    const wrapper = mount(<App />);
    wrapper.setState({ word: word });
    wrapper.setState({ score: 0 });
    wrapper.update();
    let allLetters = wrapper.find(Letters).find("span");
    let correctLetterWrapper = allLetters.filterWhere((l) => l.text().toLowerCase() ==='h');
    correctLetterWrapper.first().simulate('click');
    expect(wrapper.state('score')).toEqual(5);
});

it('Selecting an incorrect letter should decrease score by 20', () => {
    const word = "someword";
    const wrapper = mount(<App />);
    wrapper.setState({ word: word });
    wrapper.setState({ score: 50 });
    wrapper.update();
    let allLetters = wrapper.find(Letters).find("span");
    let correctLetterWrapper = allLetters.filterWhere((l) => l.text().toLowerCase() === 'z');
    correctLetterWrapper.first().simulate('click');
    expect(wrapper.state('score')).toEqual(30);
 })

it('Score component should take value from app.js state', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ score: 200 });
    wrapper.update();
    expect(wrapper.find(Score).props().score).toEqual(200);
});

