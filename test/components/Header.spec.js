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
    leftView: component.find('Header__LeftViewStyle').find('div'),
    title: component.find('Header__TitleStyle'),
    rightView: component.find('Header__RightViewStyle').find('div'),
  };
}

describe('Header component', () => {
  it('should render', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render with leftView content', () => {
    const { leftView, } = setup();
    expect(shallowToJson(leftView)).toMatchSnapshot();
  });

  it('should render with title content', () => {
    const { title, } = setup();
    expect(title.text()).toMatchSnapshot();
  });

  it('should render with rightView content', () => {
    const { rightView, } = setup();
    expect(shallowToJson(rightView)).toMatchSnapshot();
  });
});
