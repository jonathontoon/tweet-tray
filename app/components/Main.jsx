import React from 'react';
import PropTypes from 'prop-types';
import Styled, { ThemeProvider, } from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

const MainStyle = Styled.div`
  overflow: hidden;
  user-select: none;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
  position: relative;
`;

const Main = (props) => {
  const { children, colorTheme, } = props;
  return (
    <ThemeProvider theme={{ mode: colorTheme, }}>
      <MainStyle>
        {children}
      </MainStyle>
    </ThemeProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  colorTheme: PropTypes.string.isRequired,
};

export default Main;
