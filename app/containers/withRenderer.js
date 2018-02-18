import React, { Component, } from 'react';

import Notifier from '../utils/Notifier';
import Locales from '../utils/Locales';

const locales = Locales();
const { ipcRenderer, } = window.require('electron');
const notifier = new Notifier();

const withRenderer = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notifier,
        locales,
        renderer: ipcRenderer,
      };
    }

    render() {
      return (
        <WrappedComponent
          notifier={this.state.notifier}
          locales={this.state.locales}
          renderer={this.state.renderer}
          {...this.props}
        />
      );
    }
  };
};

export default withRenderer;
