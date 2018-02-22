import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PinInput from 'react-pin-input';

import ConnectUtilities from '../containers/ConnectUtilities';

import InnerContent from './InnerContent';
import Logo from './Logo';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

const AuthorizationCodeStyle = Styled.section`
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
    const {
      notificationManager,
      localeManager,
      renderer,
      onUpdateAccessTokenPair,
      onSetUserCredentials,
    } = this.props;

    renderer.on('sendauthorizeCodeError', () => {
      notificationManager.send(
        localeManager.authorization_error.title,
        localeManager.authorization_error.description,
      );
    });

    renderer.on('verifyCredentialsError', () => {
      notificationManager.send(
        localeManager.authorization_error.title,
        localeManager.authorization_error.description,
      );
    });

    renderer.on('completedOAuth', (event, response) => {
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
    const { requestTokenPair, renderer, } = this.props;
    renderer.send('sendAuthorizeCode', {
      authorizeCode,
      requestTokenPair,
    });
  }

  _onReturnToLogIn() {
    const { renderer, } = this.props;
    renderer.send('returnToLogin');
    this.context.router.history.replace('/');
  }

  render() {
    const { authorizeCode, } = this.state;
    const { localeManager, } = this.props;

    return (
      <AuthorizationCodeStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <Logo />
          <HeaderTextStyle>
            {localeManager.authorization_code.title}
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
            title={localeManager.authorization_code.authorize_button}
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
            title={localeManager.authorization_code.return_button}
          />
        </InnerContent>
      </AuthorizationCodeStyle>
    );
  }
}

export default ConnectUtilities(AuthorizationCode);
