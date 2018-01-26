import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, } from 'styled-components';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <ThemeProvider theme={{ mode: 'day', }}>
        <div>
          {this.props.children}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
