/* eslint indent: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import * as constants from '../constants';

export const InnerContentStyle = Styled.section`
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${constants.SPACING}px;
  width: auto;

  &::-webkit-scrollbar-track {
    background-color ${(props) => {
      return props.theme === 'day' ? constants.WHITE : constants.DARK_MODE_BACKGROUND;
    }};
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${(props) => {
      return props.theme === 'day' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)';
    }};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => {
      return props.theme === 'day' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)';
    }};
    border-radius: 10px;
  }
`;

const InnerContent = (props) => {
  const { children, style, theme, } = props;
  return (
    <InnerContentStyle
      style={style}
      theme={theme}
    >
      {children}
    </InnerContentStyle>
  );
};

InnerContent.propTypes = {
  theme: PropTypes.string,
  style: PropTypes.object,
};

InnerContent.defaultProps = {
  theme: 'day',
  style: null,
};

export default InnerContent;
