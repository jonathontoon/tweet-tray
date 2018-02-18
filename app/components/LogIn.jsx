import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import withRenderer from '../containers/withRenderer';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

import Logo from '../../resources/tweet-tray-logo.svg';

const LogInStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${Theme('mode', { day: constants.WHITE, night: constants.DARK_MODE_BACKGROUND, })};
  position: relative;
`;

const TwitterLogoStyle = Styled.img`
  width: 34px;
  height: 28px;
  position: relative;
  top: 40px;
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
    notifier: PropTypes.object.isRequired,
    locales: PropTypes.object.isRequired,
    renderer: PropTypes.object.isRequired,
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
      notifier,
      locales,
      renderer,
      onUpdateRequestTokenPair,
    } = this.props;

    renderer.on('startOAuthError', () => {
      notifier.send(
        locales.authorization_error.title,
        locales.authorization_error.description,
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
    const { locales, renderer, } = this.props;

    return (
      <LogInStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <TwitterLogoStyle src={Logo} alt="Twitter Logo" />
          <HeaderTextStyle>
            {process.platform === 'win32' ? locales.login.title_taskbar : locales.login.title_menubuar }
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
            title={locales.login.log_in_button}
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
            title={locales.login.quit_button}
          />
        </InnerContent>
      </LogInStyle>
    );
  }
}

export default withRenderer(LogIn);
