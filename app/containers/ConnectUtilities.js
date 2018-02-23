import React, { Component, } from 'react';

import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const notificationManager = new NotificationManager();
const localeManager = new LocaleManager();

const ConnectUtilities = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          notificationManager={notificationManager}
          localeManager={localeManager}
          {...this.props}
        />
      );
    }
  };
};

export default ConnectUtilities;
