import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, } from 'styled-components';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <ThemeProvider theme={{ mode: 'day', }}>
        <Fragment>
          {this.props.children}
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
