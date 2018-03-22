import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../app/components/Footer';

Enzyme.configure({ adapter: new Adapter(), });

function setup() {
  const component = shallow(<Footer
    leftView={<div>Left View</div>}
    rightView={<div>Right View</div>}
  />);
  return {
    component,
    leftView: component.find('Footer__LeftViewStyle').find('div'),
    rightView: component.find('Footer__RightViewStyle').find('div'),
  };
}

describe('Footer component', () => {
  it('should render', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render with leftView content', () => {
    const { leftView, } = setup();
    expect(shallowToJson(leftView)).toMatchSnapshot();
  });

  it('should render with rightView content', () => {
    const { rightView, } = setup();
    expect(shallowToJson(rightView)).toMatchSnapshot();
  });
});
