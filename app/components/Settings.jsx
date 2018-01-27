import React from 'react';
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

const Settings = (props) => {
  const {
    showSettings,
    onToggleSettingsVisibility,
    colorTheme,
    onToggleColorTheme,
    shouldLogout,
  } = props;

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
                onToggleSettingsVisibility(false);
                ipcRenderer.send('quitApplication');
              },
            }, {
              title: 'Log Out',
              action: () => {
                onToggleSettingsVisibility(false);
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
};

Settings.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  onToggleSettingsVisibility: PropTypes.func.isRequired,
  colorTheme: PropTypes.string.isRequired,
  onToggleColorTheme: PropTypes.func.isRequired,
  shouldLogout: PropTypes.func.isRequired,
};

export default Settings;

