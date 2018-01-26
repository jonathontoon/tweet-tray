import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import PinInput from 'react-pin-input';

import InnerContent from './InnerContent';
import RoundedButton from './RoundedButton';

import * as constants from '../constants';

import Logo from '../../resources/twitter-logo.svg';

const PinStyle = Styled.section`
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
    top: 78px;
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

class Pin extends Component {
  static propTypes = {
    didEnterPIN: PropTypes.func.isRequired,
    returnToLogin: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pinValue: '',
    };

    this._onInputComplete = this._onInputComplete.bind(this);
    this._onPinEntered = this._onPinEntered.bind(this);
    this._willReturnToLogin = this._willReturnToLogin.bind(this);
  }

  _onInputComplete(value) {
    this.setState({
      pinValue: value,
    });
  }

  _onPinEntered() {
    const { didEnterPIN, } = this.props;
    const { pinValue, } = this.state;

    didEnterPIN(pinValue);
  }

  _willReturnToLogin() {
    const { returnToLogin, } = this.props;
    returnToLogin();
  }

  render() {
    const { pinValue, } = this.state;

    return (
      <PinStyle>
        <InnerContent
          style={{
            height: 'calc(100% - 30px)',
          }}
        >
          <TwitterLogoStyle src={Logo} alt="Twitter Logo" />
          <HeaderTextStyle>
            Finish up by entering the 7-digit authorization code shown in the pop up window.
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
              backgroundColor: `${constants.WHITE}`,
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
            onClick={this._onPinEntered}
            style={{
              position: 'relative',
              top: '180px',
              height: '44px',
            }}
            disabled={pinValue.length < 7}
            fullWidth
            title="Complete Authorization"
          />
          <FooterTextStyle>
            If you need to restart the authoriation process you can click <FooterLinkStyle onClick={this._willReturnToLogin} href="#">here</FooterLinkStyle> and return to the log in page.
          </FooterTextStyle>
        </InnerContent>
      </PinStyle>
    );
  }
}

export default Pin;
