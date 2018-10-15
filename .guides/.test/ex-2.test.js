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

it('Solution component should exist directly under App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Solution)).toHaveLength(1);
});

it('Solution component should have a letterStatus prop', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Solution).props().letterStatus).toBeDefined();
});

it('letterStatus should be provided from the App state', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ letterStatus: 'B' });
    wrapper.update();
    expect(wrapper.find(Solution).props().letterStatus).toEqual('B');
});

it('Solution component should have its own State', () => {
    const wrapper = mount(<Solution />);
    expect(wrapper.state()).not.toBeNull();
});

it('Solution component state should have "word" and "hint" properties', () => {
    const wrapper = mount(<Solution />);
    expect(wrapper.state('word')).toBeDefined();
});

it('Solution component should have a div with the class of .hint', () => {
    const wrapper = shallow(<Solution />);
    expect(wrapper.find('.hint')).toHaveLength(1);
})

it('Solution component should render the hint inside a div', () => {
    const hintText = "testhint123";
    const wrapper = mount(<App />);
    let hintText = wrapper.instance().state.hint;
    let hintDiv = wrapper.find('.hint');
    expect(hintDiv.text().trim()).toEqual(hintText);
});

