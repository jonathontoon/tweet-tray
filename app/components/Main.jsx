import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import * as constants from '../constants';

const MainStyle = Styled.div`
  overflow: hidden;
  user-select: none;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  background-color: ${(props) => {
    return props.theme === 'day' ? constants.WHITE : constants.DARK_MODE_BACKGROUND;
  }};
  position: relative;
`;

const Main = (props) => {
  const { children, theme, } = props;
  return (
    <MainStyle
      theme={theme}
    >
      {children}
    </MainStyle>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

Main.defaultProps = {
  theme: 'day',
};

export default Main;

