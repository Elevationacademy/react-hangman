import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../src/App';
import Letters from '../src/components/Letters';
import Letter from '../src/components/Letter';
import Score from '../src/components/Score';
import Solution from '../src/components/Solution';
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

it('Clicking the reduce store button should reduce score by 10', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ score: 100 });
    wrapper.update();
    wrapper.find('#dummyButton').simulate('click');
    expect(wrapper.state('score')).toEqual(90);
});

