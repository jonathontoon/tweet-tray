import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import InnerContent from './InnerContent';
import ListView from './ListView';

import * as constants from '../constants';

const { ipcRenderer, } = window.require('electron');

const SettingsStyle = Styled.section`
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: ${constants.OPAQUE_BLACK};

    &.hidden {
      display:none;
    }
`;

class Settings extends Component {
  static propTypes = {
    showSettings: PropTypes.bool.isRequired,
    onToggleSettingsVisibility: PropTypes.func.isRequired,
    colorTheme: PropTypes.string.isRequired,
    onToggleColorTheme: PropTypes.func.isRequired,
    shouldLogout: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {
      showSettings,
      onToggleSettingsVisibility,
      colorTheme,
      onToggleColorTheme,
      shouldLogout,
    } = this.props;
  
    return (
      <SettingsStyle className={`${showSettings ? '' : 'hidden'}`}>
        <InnerContent
          style={{
            position: 'relative',
            top: '0px',
            left: '0px',
            padding: '0px',
            minHeight: '100%',
          }}
        >
          <ListView
            dataSource={
              [{
                title: `${colorTheme === 'day' ? 'Enable' : 'Disable'} Night Mode`,
                action: () => {
                  onToggleColorTheme(colorTheme === 'day' ? 'night' : 'day');
                  onToggleSettingsVisibility(false);
                },
              }, {
                title: 'Quit Tweet Tray',
                action: () => {
                  ipcRenderer.send('quitApplication');
                },
              }, {
                title: 'Log Out',
                action: () => {
                  onToggleSettingsVisibility(false);
                  this.context.router.history.replace('/');
                  shouldLogout();
                },
                type: 'warning',
              }, {
                title: 'Cancel',
                action: () => {
                  onToggleSettingsVisibility(false);
                },
                type: 'last',
              }, ]
            }
          />
        </InnerContent>
      </SettingsStyle>
    );
  }
}

export default Settings;

