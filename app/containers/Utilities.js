import React, { Component, } from 'react';
import { ipcRenderer, shell, } from 'electron';
import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const notificationManager = new NotificationManager();
const localeManager = new LocaleManager();

const Utilities = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          renderProcess={ipcRenderer}
          shell={shell}
          notificationManager={notificationManager}
          localeManager={localeManager}
          {...this.props}
        />
      );
    }
  };
};

export default Utilities;
