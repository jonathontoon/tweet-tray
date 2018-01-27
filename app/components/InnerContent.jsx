import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

export const InnerContentStyle = Styled.section`
    overflow-x: hidden;
    overflow-y: auto;
    padding: ${constants.SPACING}px;
    width: auto;

    &::-webkit-scrollbar-track {
      background-color ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color:  ${Theme('mode', { day: 'rgba(0, 0, 0, 0.25)', night: 'rgba(255, 255, 255, 0.25)', })};
    }

    &::-webkit-scrollbar-thumb {
      background-color:  ${Theme('mode', { day: 'rgba(0, 0, 0, 0.25)', night: 'rgba(255, 255, 255, 0.25)', })};
      border-radius: 10px;
    }
`;

const InnerContent = (props) => {
  const { children, style, } = props;
  return (
    <InnerContentStyle style={style}>
      {children}
    </InnerContentStyle>
  );
};

InnerContent.propTypes = {
  style: PropTypes.object,
};

InnerContent.defaultProps = {
  style: null,
};

export default InnerContent;
