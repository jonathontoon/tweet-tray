import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProfilePhoto from '../../app/components/UserProfilePhoto';
import * as testData from '../testData';

Enzyme.configure({adapter: new Adapter()});

function setup() {
  const component = shallow(<UserProfilePhoto
    profilePhotoURL={testData.userCredentials.profileImageURL}
    weightedTextAmount={testData.weightedStatus.permillage}
  />);
  return {
    component,
    image: component.find('img'),
    arc: component.find('.SVG'),
  };
}

describe('UserProfilePhoto component', () => {
  it('should display profile image', () => {
    const { image, } = setup();
    expect(image.find("img").prop("src")).toMatchSnapshot();
  });

  it('should display word counter arc with 74% filled', () => {
    const { arc, } = setup();
    expect(arc.prop('value')).toMatchSnapshot();
  });
});
