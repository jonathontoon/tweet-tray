import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import Styled, { ThemeProvider, } from 'styled-components';
import Theme from 'styled-theming';

import OAuth from './OAuth';
import Composer from './Composer';

const AppStyle = Styled.main`
    overflow: hidden;
    border: 1px solid ${Theme('mode', { day: 'rgba(0,0,0,0.1)', night: 'rgba(0,0,0,0.8)', })};
    width: 346px;
    height: 518px;
    position: relative;
`;

class App extends Component {
  static propTypes = {
    colorTheme: PropTypes.string.isRequired,
    accessTokenPair: PropTypes.object,
  }

  static defaultProps = {
    accessTokenPair: null,
  }

  constructor(props) {
    super(props);

    this._routeForOAuthState = this._routeForOAuthState.bind(this);
  }

  _routeForOAuthState() {
    const { accessTokenPair, } = this.props;
    if (accessTokenPair) {
      return <Composer />;
    }
    return <OAuth />;
  }

  render() {
    const { colorTheme, } = this.props;

    return (
      <ThemeProvider theme={{ mode: colorTheme, }}>
        <AppStyle>
          {this._routeForOAuthState()}
        </AppStyle>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    colorTheme: store.colorTheme,
    accessTokenPair: store.accessTokenPair,
  };
};

export default connect(mapStateToProps, null)(App);

