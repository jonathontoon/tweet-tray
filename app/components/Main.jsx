import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, } from 'styled-components';

class Main extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    colorTheme: PropTypes.string.isRequired,
  };

  render() {
    const { children, colorTheme, } = this.props;
    return (
      <ThemeProvider theme={{ mode: colorTheme, }}>
        <Fragment>
          {children}
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default Main;
