import React, { Component, } from 'react';
import { ipcRenderer, remote, } from 'electron';
import NotificationManager from '../utils/NotificationManager';
import LocaleManager from '../utils/LocaleManager';

const notificationManager = NotificationManager();
const localeManager = LocaleManager();

const renderer = ipcRenderer;

const ConnectUtilities = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notificationManager,
        localeManager,
        renderer,
      };
    }

    render() {
      return (
        <WrappedComponent
          notificationManager={this.state.notificationManager}
          localeManager={this.state.localeManager}
          renderer={this.state.renderer}
          {...this.props}
        />
      );
    }
  };
};

export default ConnectUtilities;
