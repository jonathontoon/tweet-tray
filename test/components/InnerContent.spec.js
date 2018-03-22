import React from 'react';
import Enzyme, { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import InnerContent from '../../app/components/InnerContent';

Enzyme.configure({ adapter: new Adapter(), });

function setup() {
  const component = shallow(<InnerContent><div>Test Content</div></InnerContent>);
  return {
    component,
    innerContent: component.find('InnerContent__InnerContentStyle').find('div'),
  };
}

describe('InnerContent component', () => {
  it('should render', () => {
    const { component, } = setup();
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render content', () => {
    const { innerContent, } = setup();
    expect(shallowToJson(innerContent)).toMatchSnapshot();
  });
});
