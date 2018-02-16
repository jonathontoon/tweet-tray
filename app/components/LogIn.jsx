import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';
import Localize from 'localize';

import Notifier from '../utils/Notifier';
import ParseLocale from '../utils/ParseLocale';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

import LoginStrings from '../translations/Login.json';
import AuthorizationErrorStrings from '../translations/AuthorizationError.json';

import Logo from '../../resources/tweet-tray-logo.svg';
import NotificationIcon from '../../resources/notification.jpg';

const { ipcRenderer, remote, } = window.require('electron');
const { app, } = remote;

const locale = ParseLocale(app.getLocale());

const loginLocalizations = new Localize(LoginStrings);
loginLocalizations.setLocale(locale);

const authorizationErrorLocalizations = new Localize(AuthorizationErrorStrings);
authorizationErrorLocalizations.setLocale(locale);

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
    ipcRenderer.on('startOAuthError', () => {
      Notifier(authenticationErrorLocalizations.translate('title'), authenticationErrorLocalizations.translate('description'), false, NotificationIcon, null);
    });

    ipcRenderer.on('receivedRequestTokenPair', (event, requestTokenPair) => {
      const { onUpdateRequestTokenPair, } = this.props;
      onUpdateRequestTokenPair(requestTokenPair);
    });

    ipcRenderer.on('startedAuthorizationCode', () => {
      this.context.router.history.replace('/authorization');
    });

    ipcRenderer.on('canceledOAuth', () => {
      this.context.router.history.replace('/');
    });
  }

  render() {
    return (
      <LogInStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <TwitterLogoStyle src={Logo} alt="Twitter Logo" />
          <HeaderTextStyle>
            {loginLocalizations.translate('title', process.platform === 'win32' ? loginLocalizations.translate('taskbar') : localizations.translate('menubar'))}
          </HeaderTextStyle>
          <RoundedButton
            onClick={() => {
              ipcRenderer.send('startOAuth');
            }}
            style={{
              position: 'relative',
              top: '264px',
              height: '44px',
            }}
            fullWidth
            title={loginLocalizations.translate('sign_in_button')}
          />
          <RoundedButton
            onClick={() => {
              ipcRenderer.send('quitApplication');
            }}
            style={{
              position: 'relative',
              top: '280px',
              height: '44px',
            }}
            fullWidth
            borderButton
            title={loginLocalizations.translate('quit_button')}
          />
        </InnerContent>
      </LogInStyle>
    );
  }
}

export default LogIn;
