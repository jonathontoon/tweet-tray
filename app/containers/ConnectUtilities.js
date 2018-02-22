import React, { Component, } from 'react';
import { ipcRenderer, shell, } from 'electron';

import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const notificationManager = new NotificationManager();
const localeManager = LocaleManager();

const ConnectUtilities = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          notificationManager={notificationManager}
          localeManager={localeManager}
          renderer={ipcRenderer}
          shell={shell}
          {...this.props}
        />
      );
    }
  };
};

export default ConnectUtilities;
