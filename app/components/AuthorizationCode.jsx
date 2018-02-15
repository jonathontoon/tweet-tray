import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PinInput from 'react-pin-input';
import Localize from 'localize';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import Locale from '../utils/Locale';

import * as constants from '../constants';

import Logo from '../../resources/tweet-tray-logo.svg';
import NotificationIcon from '../../resources/notification.jpg';

import AuthorizationErrorStrings from '../translations/AuthorizationError';
import AuthorizationCodeStrings from '../translations/AuthorizationCode';

const { ipcRenderer, } = window.require('electron');

const authorizationErrorLocalizations = new Localize(AuthorizationErrorStrings);
authorizationErrorLocalizations.setLocale(Locale());

const authorizationCodeLocalizations = new Localize(AuthorizationCodeStrings);
authorizationCodeLocalizations.setLocale(Locale());

const AuthorizationCodeStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: ${constants.WHITE};
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
    color: ${constants.BLACK};
    text-align: left;
    font-size: ${constants.XTRA_LARGE_FONT_SIZE}px;
    font-weight: bold;
    position: relative;
    top: 80px;
    line-height: 30px;
`;

class AuthorizationCode extends Component {
  static propTypes = {
    requestTokenPair: PropTypes.object,
    onUpdateAccessTokenPair: PropTypes.func.isRequired,
    onSetUserCredentials: PropTypes.func.isRequired,
  };

  static defaultProps = {
    requestTokenPair: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      authorizeCode: '',
    };

    this._onInputComplete = this._onInputComplete.bind(this);
    this._onCodeEntered = this._onCodeEntered.bind(this);
    this._onReturnToLogIn = this._onReturnToLogIn.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('sendauthorizeCodeError', () => {
      Notifier(authorizationErrorLocalizations.translate('title'), authorizationErrorLocalizations.translate('description'), false, NotificationIcon, null);
    });

    ipcRenderer.on('verifyCredentialsError', () => {
      Notifier(authorizationErrorLocalizations.translate('title'), authorizationErrorLocalizations.translate('description'), false, NotificationIcon, null);
    });

    ipcRenderer.on('completedOAuth', (event, response) => {
      const { onUpdateAccessTokenPair, onSetUserCredentials, } = this.props;
      onUpdateAccessTokenPair(response.accessTokenPair);
      onSetUserCredentials(response.userCredentials);
      this.context.router.history.replace('/composer');
    });
  }

  _onInputComplete(value) {
    this.setState({
      authorizeCode: value,
    });
  }

  _onCodeEntered() {
    const { authorizeCode, } = this.state;
    const { requestTokenPair, } = this.props;
    ipcRenderer.send('sendAuthorizeCode', {
      authorizeCode,
      requestTokenPair,
    });
  }

  _onReturnToLogIn() {
    ipcRenderer.send('returnToLogin');
    this.context.router.history.replace('/');
  }

  render() {
    const { authorizeCode, } = this.state;

    return (
      <AuthorizationCodeStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <TwitterLogoStyle src={Logo} alt="Twitter Logo" />
          <HeaderTextStyle>
            {authorizationCodeLocalizations.translate('title')}
          </HeaderTextStyle>
          <PinInput
            length={7}
            type="numeric"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '48px',
              width: '100%',
              margin: '0px !important',
              padding: '0px !important',
              position: 'relative',
              top: '146px',
            }}
            inputStyle={{
              width: '14.2857143%',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: `${constants.LIGHT_GREY}`,
              border: `1px solid ${constants.BORDER_GREY}`,
              borderRadius: '4px',
              height: '48px',
              margin: '0px 3px',
            }}
            inputFocusStyle={{
              border: `1px solid ${constants.BORDER_GREY}`,
            }}
            onComplete={this._onInputComplete}
          />
          <RoundedButton
            onClick={this._onCodeEntered}
            style={{
              position: 'relative',
              top: '216px',
              height: '44px',
            }}
            disabled={authorizeCode.length < 7}
            fullWidth
            title={authorizationCodeLocalizations.translate('authorize_button')}
          />
          <RoundedButton
            onClick={this._onReturnToLogIn}
            style={{
              position: 'relative',
              top: '232px',
              height: '44px',
            }}
            fullWidth
            borderButton
            title={authorizationCodeLocalizations.translate('return_button')}
          />
        </InnerContent>
      </AuthorizationCodeStyle>
    );
  }
}

export default AuthorizationCode;
