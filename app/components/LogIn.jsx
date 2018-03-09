import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

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
  background-color: ${constants.WHITE};
  position: relative;
`;

const HeaderTextStyle = Styled.h1`
  padding: 0;
  margin: 0;
  color: ${constants.BLACK};
  text-align: left;
  font-size: ${constants.XTRA_LARGE_FONT_SIZE}px;
  font-weight: bold;
  position: relative;
  top: 80px;
  line-height: 30px;
`;

const ButtonContainerStyle = Styled.div`
  position: absolute;
  bottom: ${constants.SPACING}px;
  width: 318px;
  height: auto;
`;

class LogIn extends Component {
  static propTypes = {
    accessTokenPair: PropTypes.object,
    profileImageURL: PropTypes.string,
    onUpdateRequestTokenPair: PropTypes.func.isRequired,
    renderProcess: PropTypes.object.isRequired,
    notificationManager: PropTypes.object.isRequired,
    localeManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    accessTokenPair: null,
    profileImageURL: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onStartOAuth = this.onStartOAuth.bind(this);
    this.onQuitApplication = this.onQuitApplication.bind(this);
  }

  componentWillMount() {
    const { accessTokenPair, profileImageURL, } = this.props;
    if (accessTokenPair !== null && profileImageURL !== null) {
      this.context.router.history.replace('/composer');
    }
  }

  componentDidMount() {
    const {
      renderProcess,
      notificationManager,
      localeManager,
      onUpdateRequestTokenPair,
    } = this.props;

    renderProcess.on('startOAuthError', () => {
      notificationManager.send(
        localeManager.authorization_error.title,
        localeManager.authorization_error.description,
        false,
      );
    });

    renderProcess.on('receivedRequestTokenPair', (event, requestTokenPair) => {
      onUpdateRequestTokenPair(requestTokenPair);
    });

    renderProcess.on('startedAuthorizationCode', () => {
      this.context.router.history.replace('/authorization');
    });

    renderProcess.on('canceledOAuth', () => {
      this.context.router.history.replace('/');
    });
  }

  onStartOAuth() {
    const { renderProcess, } = this.props;
    renderProcess.send('startOAuth');
  }

  onQuitApplication() {
    const { renderProcess, } = this.props;
    renderProcess.send('quitApplication');
  }

  render() {
    const { localeManager, } = this.props;

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
          <ButtonContainerStyle>
            <RoundedButton
              onClick={this.onStartOAuth}
              height={44}
              fullWidth
              title={localeManager.login.log_in_button}
            />
            <RoundedButton
              onClick={this.onQuitApplication}
              height={44}
              marginTop={constants.SPACING}
              fullWidth
              borderButton
              title={localeManager.login.quit_button}
            />
          </ButtonContainerStyle>
        </InnerContent>
      </LogInStyle>
    );
  }
}

export default ConnectUtilities(LogIn);
