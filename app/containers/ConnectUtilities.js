import React, { Component, } from 'react';

import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const renderProcess = require('electron').ipcRenderer;
const { shell, remote, } = require('electron');

const { dialog, } = remote;
const notificationManager = new NotificationManager();
const localeManager = new LocaleManager();

const ConnectUtilities = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          renderProcess={renderProcess}
          shell={shell}
          dialog={dialog}
          notificationManager={notificationManager}
          localeManager={localeManager}
          {...this.props}
        />
      );
    }
  };
};

export default ConnectUtilities;
