import React from 'react';
import { spy } from 'sinon';
import Enzyme, { shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatusInput from '../../app/components/StatusInput';
import * as testData from '../testData';

Enzyme.configure({adapter: new Adapter()});

function setup() {
  const component = shallow(<StatusInput
    placeholder={'What\'s happening?'}
    weightedStatusText={testData.weightedStatus.text}
    updateWeightedStatus={() => { return true; }}
  />);
  return {
    component,
    textArea: component.find('textarea'),
  };
}

describe('StatusInput component', () => {
  it('should display textarea', () => {
    const { textArea, } = setup();
    expect(textArea.prop("defaultValue")).toMatchSnapshot();
  });
});
