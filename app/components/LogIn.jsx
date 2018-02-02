import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import Notifier from '../utils/Notifier';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

import Logo from '../../resources/twitter-logo.svg';

const { ipcRenderer, shell, } = window.require('electron');

const LogInStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
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
  line-height: 28px;
`;

const FooterTextStyle = Styled.div`
  position: relative;
  top: 277px;
  font-size: ${constants.SMALL_FONT_SIZE}px;
  color: ${constants.GREY};
`;

const FooterLink = Styled.a`
  font-weight: bold;
  color: ${constants.GREY};
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
      Notifier('Oops, an error occured!', 'Your account failed to authenticate', false, null);
    });

    ipcRenderer.on('receivedRequestTokenPair', (event, requestTokenPair) => {
      const { onUpdateRequestTokenPair, } = this.props;
      onUpdateRequestTokenPair(requestTokenPair);
    });

    ipcRenderer.on('startedCodeVerification', () => {
      this.context.router.history.replace('/verifier');
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
            Tweet quickly from the desktop {process.platform === 'darwin' ? 'menu bar' : 'system tray'}, without any more distractions.
          </HeaderTextStyle>
          <RoundedButton
            onClick={() => {
              ipcRenderer.send('startOAuth');
            }}
            style={{
              position: 'relative',
              top: '124px',
              height: '44px',
            }}
            fullWidth
            title="Sign in with Twitter"
          />
          <FooterTextStyle>
            Tweet Tray is licensed under <FooterLink onClick={() => { shell.openExternal('https://opensource.org/licenses/MIT'); }} href="#">MIT</FooterLink>, and is not in any way affiliated or endorsed by Twitter, the company or any individual of the company.
          </FooterTextStyle>
        </InnerContent>
      </LogInStyle>
    );
  }
}

export default LogIn;
