import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RoundedButton from '../../app/components/RoundedButton';

Enzyme.configure({ adapter: new Adapter(), });

function setup() {
  const component = shallow(<RoundedButton />);
  return {
    component,
  };
}

describe('RoundedButton component', () => {
  it('should display button with title', () => {
    const { component, } = setup();
    expect(component.prop('value')).toMatchSnapshot();
  });
});
