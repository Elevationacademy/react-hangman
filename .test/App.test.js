import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Letters from '../src/components/Letters';
import Letter from '../src/components/Letter';
import Score from '../src/components/Score';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have one Letters component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Letters)).toHaveLength(1);
});

it('should have one Letter component under Letters', () => {
    const wrapper = shallow(<Letters />);
    expect(wrapper.find(Letter)).toHaveLength(1);
})