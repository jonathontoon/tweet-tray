import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import RoundedButton from '../../app/components/RoundedButton';

Enzyme.configure({ adapter: new Adapter(), });

const mockCallBack = jest.fn();

function setup() {
  const component = shallow(<RoundedButton
    fullWidth
    value="I am a button"
    onClick={mockCallBack}
  />);
  return {
    component,
    button: component.find('.fullWidth'),
  };
}

describe('RoundedButton component', () => {
  it('should render full width button', () => {
    const { button, } = setup();
    expect(shallowToJson(button)).toMatchSnapshot();
  });
  it('button should contain value', () => {
    const { button, } = setup();
    expect(button.prop('value')).toMatchSnapshot();
  });
  it('button should respond to click event', () => {
    const { button, } = setup();
    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
