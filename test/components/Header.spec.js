import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../app/components/Header';

Enzyme.configure({ adapter: new Adapter(), });

function setup() {
  const component = shallow(<Header
    leftView={<div>Left View</div>}
    title="Header Title"
    rightView={<div>Right View</div>}
  />);
  return {
    component,
    leftView: component.find('Header__LeftViewStyle'),
    title: component.find('Header__TitleStyle'),
    rightView: component.find('Header__RightViewStyle'),
  };
}

describe('Header component', () => {
  it('should render', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render with leftView', () => {
    const { leftView, } = setup();
    expect(shallowToJson(leftView)).toMatchSnapshot();
  });

  it('should render with title', () => {
    const { title, } = setup();
    expect(shallowToJson(title)).toMatchSnapshot();
  });

  it('should render with rightView', () => {
    const { rightView, } = setup();
    expect(shallowToJson(rightView)).toMatchSnapshot();
  });

});
