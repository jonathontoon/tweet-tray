import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import ConnectUtilities from '../containers/ConnectUtilities';

import InnerContent from './InnerContent';
import Logo from './Logo';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

const LogInStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
  position: relative;
`;

const HeaderTextStyle = Styled.h1`
  padding: 0;
  margin: 0;
  color: ${Theme('mode', { day: constants.BLACK, night: constants.WHITE, })};
  text-align: left;
  font-size: ${constants.XTRA_LARGE_FONT_SIZE}px;
  font-weight: bold;
  position: relative;
  top: 80px;
  line-height: 30px;
`;

class LogIn extends Component {
  static propTypes = {
    accessTokenPair: PropTypes.object,
    userCredentials: PropTypes.object,
    onUpdateRequestTokenPair: PropTypes.func.isRequired,
    renderer: PropTypes.object.isRequired,
    notificationManager: PropTypes.object.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    accessTokenPair: null,
    userCredentials: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    const { accessTokenPair, userCredentials, } = this.props;
    if (accessTokenPair !== null && userCredentials !== null) {
      this.context.router.history.replace('/composer');
    }
  }

  componentDidMount() {
    const {
      notificationManager,
      localeManager,
      renderer,
      onUpdateRequestTokenPair,
    } = this.props;

    renderer.on('startOAuthError', () => {
      notificationManager.send(
        localeManager.authorization_error.title,
        localeManager.authorization_error.description,
        false,
        null,
      );
    });

    renderer.on('receivedRequestTokenPair', (event, requestTokenPair) => {
      onUpdateRequestTokenPair(requestTokenPair);
    });

    renderer.on('startedAuthorizationCode', () => {
      this.context.router.history.replace('/authorization');
    });

    renderer.on('canceledOAuth', () => {
      this.context.router.history.replace('/');
    });
  }

  render() {
    const { localeManager, renderer, } = this.props;

    return (
      <LogInStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <Logo />
          <HeaderTextStyle>
            {process.platform === 'win32' ? localeManager.login.title_taskbar : localeManager.login.title_menubuar }
          </HeaderTextStyle>
          <RoundedButton
            onClick={() => {
              renderer.send('startOAuth');
            }}
            style={{
              position: 'relative',
              top: '264px',
              height: '44px',
            }}
            fullWidth
            title={localeManager.login.log_in_button}
          />
          <RoundedButton
            onClick={() => {
              renderer.send('quitApplication');
            }}
            style={{
              position: 'relative',
              top: '280px',
              height: '44px',
            }}
            fullWidth
            borderButton
            title={localeManager.login.quit_button}
          />
        </InnerContent>
      </LogInStyle>
    );
  }
}

export default ConnectUtilities(LogIn);
