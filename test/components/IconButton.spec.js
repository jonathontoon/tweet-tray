import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import IconButton from '../../app/components/IconButton';

import SettingsIcon from '../../resources/settings.svg';

Enzyme.configure({ adapter: new Adapter(), });

const mockCallBack = jest.fn();

function setup() {
  const component = shallow(<IconButton
    iconSrc={SettingsIcon}
    altText="Settings Icon"
    onClick={mockCallBack}
  />);
  return {
    component,
    image: component.find('IconButton__ImageStyle'),
  };
}

describe('IconButton component', () => {
  it('should render button', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render image inside button', () => {
    const { image, } = setup();
    expect(shallowToJson(image)).toMatchSnapshot();
  });
});
