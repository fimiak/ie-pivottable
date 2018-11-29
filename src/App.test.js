import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App from './App';
import Button from './components/Button';
import ClickMenu from './components/ClickMenu';
import Filter from './components/Filter';
import Table from './components/Table';

configure({ adapter: new Adapter() });

/*** Jest Tests ***/

// Base test to ensure a working Jest package
function sum(a, b) {
  return a + b;
}

test('test sum', () => {
  expect(sum(1, 2)).toBe(3);
});

// Test to see that app starts
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Test table render

describe('Table Component', () => {
  it('Renders in screen', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper).toMatchSnapshot();
  });
});

// Test button render

describe('Button Component ', () => {
  it('Renders on screen', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});

// Test Click Menu render in app (CSS set to display: none by default)

describe('Click Menu Component', () => {
  it('Renders in screen', () => {
    const wrapper = shallow(<ClickMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});

// Test filter render

describe('Filter Component ', () => {
  it('Renders on screen', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper).toMatchSnapshot();
  });
});

// Test to see that filter returns filtered list
