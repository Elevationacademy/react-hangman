import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../../src/App';
import Letters from '../../../src/components/Letters';
import Letter from '../../../src/components/Letter';
import Score from '../../../src/components/Score';
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


it('The game should have a "restart game" button with the class "restart-button"', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('.restart-game')).toHaveLength(1);
});

it('The game should provide a new word when clicking the restart button', () => {
    const wrapper = mount(<App/>);
    const restartButton = wrapper.find('.restart-game');
    let oldWord = wrapper.state('word');
    restartButton.simulate('click');
    let newWord = wrapper.state('word');
    expect(oldWord).not.toEqual(newWord);
});

it('The game should provide a new hint when clicking the restart button', () => {
    const wrapper = mount(<App/>);
    const restartButton = wrapper.find('.restart-game');
    let oldHint = wrapper.state().hint;
    restartButton.simulate('click');
    let newHint = wrapper.state().hint;
    expect(oldHint).not.toEqual(newHint);
});