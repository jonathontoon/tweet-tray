import React, { Component, } from 'react';
import { ipcRenderer, shell, } from 'electron';

import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const notificationManager = new NotificationManager();
const localeManager = LocaleManager();

const ConnectUtilities = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notificationManager,
        localeManager,
        renderer: ipcRenderer,
        shell,
      };
    }

    render() {
      return (
        <WrappedComponent
          notificationManager={this.state.notificationManager}
          localeManager={this.state.localeManager}
          renderer={this.state.renderer}
          shell={this.state.shell}
          {...this.props}
        />
      );
    }
  };
};

export default ConnectUtilities;
