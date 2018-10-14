import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../src/App';
import Letters from '../../src/components/Letters';
import Letter from '../../src/components/Letter';
import Score from '../../src/components/Score';
import Solution from '../../src/components/Solution';
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

it('Solution component should have a div with that class of .word', () => {
  const wrapper = shallow(<Solution />);
  expect(wrapper.find('.word')).toHaveLength(1);
});

it('Solution component should display the word from the state object', () => {
    const word = "testword234";
    const wrapper = mount(<Solution />);
    wrapper.setState({ word: word });
    wrapper.update();
    expect(wrapper.find('.word').text()).toEqual(word);
});

it('Solution component should render the letters in a separate Letter component', () => {
    const word = "testword123";
    const wrapper = shallow(<Solution />);
    wrapper.setState({ word: word });
    wrapper.update();
    expect(wrapper.find(Letter)).toHaveLength(word.length);
});

