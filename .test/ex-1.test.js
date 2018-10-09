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

it('Score component should have a "score" property', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Score).props().score).toBeDefined();
});

it('Score component should take value from app.js state', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ score: 200 });
    wrapper.update();
    expect(wrapper.find(Score).props().score).toEqual(200);
});

