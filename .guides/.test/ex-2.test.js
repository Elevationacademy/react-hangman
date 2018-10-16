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


 it('When the user has more than 80 points, the Score div should have the "high-score" class', () => {
    const expectedClassName = '.high-score'; 
    const wrapper = mount(<App />);
    wrapper.setState({ score: 100 });
    wrapper.update();
    expect(wrapper.find(expectedClassName)).toHaveLength(1);
 });

 it ('When the user has between 50 and 80 points, the Score div should have the "medium-score" class', () => {
     const expectedClassName = '.medium-score';
     const wrapper = mount(<App />);
     wrapper.setState({ score: 60 });
     wrapper.update();
     expect(wrapper.find(expectedClassName)).toHaveLength(1);
 });

 it('When the user has less than 50 points, the Score div should have the "low-score" class', () => {
     const expectedClassName = '.low-score';
     const wrapper = mount(<App />);
     wrapper.setState({ score: 10 });
     wrapper.update(); 
     expect(wrapper.find(expectedClassName)).toHaveLength(1);
 });



