import React from 'react';
import App from './src/App';
import Letters from './src/component/Letters';
import Letter from './src/component/Letter';
import Score from './src/component/Score';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('App should have one Letters component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Letters)).toHaveLength(1);
});