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

it('Selecting a correct letter should increase score by 5', () => {
    const wrapper = mount(<App />);
    const word = wrapper.state('word');
    const score = parseInt(wrapper.state('score'));
    let allLetters = wrapper.find(Letters).find("span");
    let correctLetterWrapper = allLetters.filterWhere((l) => word.toLowerCase().indexOf(l.text().toLowerCase()) > 0);
    correctLetterWrapper.first().simulate('click');
    expect(parseInt(wrapper.state('score'))).toEqual(parseInt(score+5));
});

it('Selecting an incorrect letter should decrease score by 20', () => {
    const wrapper = mount(<App />);
    const word = wrapper.state('word');
    const score = parseInt(wrapper.state('score'));
    let allLetters = wrapper.find(Letters).find("span");
    let correctLetterWrapper = allLetters.filterWhere((l) => word.toLowerCase().indexOf(l.text().toLowerCase()) < 0);
    correctLetterWrapper.first().simulate('click');
    expect(parseInt(wrapper.state('score'))).toEqual(parseInt(score-20));
 });