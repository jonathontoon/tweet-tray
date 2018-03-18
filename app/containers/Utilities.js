import React, { Component, } from 'react';
import { ipcRenderer, shell, remote, } from 'electron';
import LocaleManager from '../utils/LocaleManager';

const { app, } = remote;
const localeManager = new LocaleManager();

const Utilities = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          app={app}
          renderProcess={ipcRenderer}
          shell={shell}
          localeManager={localeManager}
          {...this.props}
        />
      );
    }
  };
};

export default Utilities;
