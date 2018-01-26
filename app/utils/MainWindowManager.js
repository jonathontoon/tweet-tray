import path from 'path';
import Positioner from 'electron-positioner';
import IS_DEV from 'electron-is-dev';
import { app, BrowserWindow, Tray, Menu, } from 'electron';

import OAuthManager from './OAuthManager';
import config from './config';

class MainWindowManager {
  constructor() {
    this.oauthManager = null;
    this.tray = null;
    this.window = null;
    this.windowPositioner = null;

    this.createOAuth = this.createOAuth.bind(this);

    this.initTray = this.initTray.bind(this);

    this.createWindow = this.createWindow.bind(this);
    this.showWindow = this.showWindow.bind(this);
    this.hideWindow = this.hideWindow.bind(this);
  }

  createOAuth() {
    return new OAuthManager(config, this.window);
  }

  createWindow() {
    const window = new BrowserWindow({
      width: 348,
      height: 520,
      resizable: false,
      frame: false,
      titleBarStyle: 'hidden',
      show: false,
      backgroundColor: '#1DA1F2',
      skipTaskbar: true,
      alwaysOnTop: true,
      icon: path.join(__dirname, '../../resources/icon.ico'),
    });

    window.loadURL(`file://${path.join(__dirname, '../app.html')}`);
    window.setMenu(null);

    window.on('closed', () => {
      this.window = null;
    });

    window.on('blur', () => {
      this.hideWindow();
    });

    window.once('ready-to-show', () => {
      if (!this.window) {
        throw new Error('"window" is not defined');
      }

      this.windowPositioner = new Positioner(window);

      if (IS_DEV) {
        window.webContents.openDevTools();
      }

    });

    return window;
  }

  hideWindow() {
    if (this.oauthManager.window && this.oauthManager.window.isVisible()) return;
    if (!this.window && !this.window.isVisible()) return;
    this.window.hide();
  }

  showWindow() {
    if (this.window !== null) {
      const trayPosition = (process.platform === 'darwin') ? 'trayCenter' : 'trayBottomCenter';
      const trayBounds = this.tray.getBounds();

      const position = this.windowPositioner.calculate(trayPosition, trayBounds);

      this.window.setPosition(position.x, position.y - 6);
      this.window.show();
    }
  }

  initTray() {
    if (this.tray === null) {
      this.tray = new Tray(path.join(__dirname, '../../resources/system-tray.ico'));
      const contextMenu = Menu.buildFromTemplate([{
        label: 'Quit Tweet Tray',
        click() { app.quit(); },
      }, ]);
      this.tray.setToolTip('Tweet Tray');
      this.tray.setContextMenu(contextMenu);

      if (this.window === null) {
        this.window = this.createWindow();
      }

      if (this.oauthManager === null) {
        this.oauthManager = this.createOAuth();
      }

      this.tray.on('click', () => {
        if (this.window === null || this.window.isVisible()) return;
        this.showWindow();
      });
    }
  }
}

export default MainWindowManager;
