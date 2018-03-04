import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Logo from '../../app/components/Logo';

Enzyme.configure({ adapter: new Adapter(), });

function setup() {
  const component = shallow(<Logo />);
  return {
    component,
  };
}

describe('Logo component', () => {
  it('should render image', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should render image with alt text', () => {
    const { component, } = setup();
    expect(component.prop('alt')).toMatchSnapshot();
  });
});
