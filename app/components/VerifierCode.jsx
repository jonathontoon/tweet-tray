import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import PinInput from 'react-pin-input';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

import Logo from '../../resources/twitter-logo.svg';
import NotificationIcon from '../../resources/notification.jpg';

const { ipcRenderer, } = window.require('electron');

const VerifierCodeStyle = Styled.section`
  overflow: hidden;
  user-select: none;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
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
    line-height: 28px;
`;

const FooterTextStyle = Styled.div`
  position: relative;
  top: 247px;
  font-size: ${constants.SMALL_FONT_SIZE}px;
  color: ${constants.GREY};
`;

const FooterLinkStyle = Styled.a`
  font-weight: bold;
  color: ${constants.GREY};
`;

class VerifierCode extends Component {
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
      verifierCode: '',
    };

    this._onInputComplete = this._onInputComplete.bind(this);
    this._onCodeEntered = this._onCodeEntered.bind(this);
    this._onReturnToLogIn = this._onReturnToLogIn.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('sendVerifierCodeError', () => {
      Notifier('Oops, an error occured!', 'Your account failed to authenticate', false, NotificationIcon, null);
    });

    ipcRenderer.on('verifyCredentialsError', () => {
      Notifier('Oops, an error occured!', 'Your account failed to authenticate', false, NotificationIcon, null);
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
      verifierCode: value,
    });
  }

  _onCodeEntered() {
    const { verifierCode, } = this.state;
    const { requestTokenPair, } = this.props;
    ipcRenderer.send('sendVerifierCode', {
      verifierCode,
      requestTokenPair,
    });
  }

  _onReturnToLogIn() {
    ipcRenderer.send('returnToLogin');
    this.context.router.history.replace('/');
  }

  render() {
    const { verifierCode, } = this.state;

    return (
      <VerifierCodeStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <TwitterLogoStyle src={Logo} alt="Twitter Logo" />
          <HeaderTextStyle>
            Finish up by entering the 7-digit verification code shown in the pop up window.
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
              top: '125px',
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
              top: '180px',
              height: '44px',
            }}
            disabled={verifierCode.length < 7}
            fullWidth
            title="Complete Authorization"
          />
          <FooterTextStyle>
            If you need to restart the authoriation process you can click <FooterLinkStyle onClick={this._onReturnToLogIn} href="#">here</FooterLinkStyle> and return to the log in page.
          </FooterTextStyle>
        </InnerContent>
      </VerifierCodeStyle>
    );
  }
}

export default VerifierCode;
