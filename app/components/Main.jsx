import React, { Component, } from 'react';
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

class Main extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    colorTheme: PropTypes.string.isRequired,
  };

  render() {
    const { children, colorTheme, } = this.props;
    return (
      <ThemeProvider theme={{ mode: colorTheme, }}>
        <MainStyle>
          {children}
        </MainStyle>
      </ThemeProvider>
    );
  }
}

export default Main;
