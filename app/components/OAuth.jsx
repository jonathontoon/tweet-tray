import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import LogIn from './LogIn';
import Pin from './Pin';

const { ipcRenderer, } = window.require('electron');

class OAuth extends Component {
  static propTypes = {
    onUpdateAccessTokenPair: PropTypes.func.isRequired,
    requestTokenPair: PropTypes.object,
    onUpdateRequestTokenPair: PropTypes.func.isRequired,
    onSetUserCredentials: PropTypes.func.isRequired,
  };

  static defaultProps = {
    requestTokenPair: null,
  };


  constructor(props) {
    super(props);
    this.state = {
      initiatedOAuth: false,
    };
  }

  componentDidMount() {
    ipcRenderer.on('startedCodeVerification', () => {
      this.setState({
        initiatedOAuth: true,
      });
    });

    ipcRenderer.on('receivedRequestTokenPair', (event, requestTokenPair) => {
      const { onUpdateRequestTokenPair, } = this.props;
      onUpdateRequestTokenPair(requestTokenPair);
    });

    ipcRenderer.on('completedOAuth', (event, response) => {
      const { onUpdateAccessTokenPair, onSetUserCredentials, } = this.props;
      onUpdateAccessTokenPair(response.accessTokenPair);
      onSetUserCredentials(response.userCredentials);
    });

    ipcRenderer.on('canceledOAuth', () => {
      this.setState({
        initiatedOAuth: false,
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      initiatedOAuth: false,
    });
  }

  render() {
    const { initiatedOAuth, } = this.state;
    const { requestTokenPair, } = this.props;

    if (initiatedOAuth === true) {
      return (
        <Pin
          didEnterPIN={(code) => {
            ipcRenderer.send('sendCodeVerifier', {
              code,
              requestTokenPair,
            });
          }}
          returnToLogin={() => {
            ipcRenderer.send('returnToLogin');
          }}
        />
      );
    }

    return (
      <LogIn initiateOAuth={() => {
          ipcRenderer.send('startOAuth');
        }}
      />
    );
  }
}

export default OAuth;

