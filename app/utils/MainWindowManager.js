import fs from 'fs';
import path from 'path';
import Positioner from 'electron-positioner';
import IS_DEV from 'electron-is-dev';
import { app, BrowserWindow, Tray, Menu, dialog, } from 'electron';

import OAuthManager from './OAuthManager';
import config from './config';

class MainWindowManager {
  constructor() {
    this.oauthManager = null;
    this.tray = null;
    this.window = null;
    this.windowIsReady = false;
    this.windowPositioner = null;

    this.createOAuth = this.createOAuth.bind(this);

    this.initTray = this.initTray.bind(this);

    this.createWindow = this.createWindow.bind(this);
    this.showWindow = this.showWindow.bind(this);
    this.hideWindow = this.hideWindow.bind(this);

    this.openImageDialog = this.openImageDialog.bind(this);
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
      skipTaskbar: true,
      alwaysOnTop: true,
      icon: path.join(__dirname, '../../resources/icon.ico'),
    });

    window.loadURL(`file://${path.join(__dirname, '../app.html')}`);
    window.setMenu(null);

    this.windowPositioner = new Positioner(window);

    window.on('closed', () => {
      this.window = null;
    });

    // window.on('blur', () => {
    //   this.hideWindow();
    // });

    window.once('ready-to-show', () => {
      if (!this.window) {
        throw new Error('"window" is not defined');
      }

      if (IS_DEV) {
        window.webContents.openDevTools();
      }

      this.windowIsReady = true;
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
        if ((this.window !== null || !this.window.isVisible()) && this.windowIsReady) {
          this.showWindow();
        }
      });
    }
  }

  static processFile(filePath, callback) {
    fs.readFile(filePath, (readFileError, data) => {
      if (readFileError) {
        console.log(readFileError);
      }
      const base64ImageData = Buffer.from(data).toString('base64');
      callback({
        path: filePath,
        data: base64ImageData,
      });
    });
  }

  openImageDialog(callback) {
    const properties = ['openFile', ];

    // Only Mac OSX supports the openDirectory option for file dialogs
    if (process.platform === 'darwin') {
      properties.push('openDirectory');
    }

    dialog.showOpenDialog({
      title: 'Select a Photo',
      buttonLabel: 'Add Photo',
      filters: [
        { name: 'Images', extensions: ['jpeg', 'jpg', 'png', 'gif', ], },
      ],
      properties,
    }, (filePaths) => {
      if (filePaths !== undefined) {
        const imageSize = fs.lstatSync(filePaths[0]).size / (1024 * 1024);
        const imageExtension = path.extname(filePaths[0]);
        if (imageExtension === '.gif' && imageSize <= 15.0) {
          this.constructor.processFile(filePaths[0], (image) => {
            callback(image);
          });
        } else if (imageExtension !== '.gif' && imageSize <= 5.0) {
          this.constructor.processFile(filePaths[0], (image) => {
            callback(image);
          });
        }
      }

      this.showWindow();
    });
  }
}

export default MainWindowManager;
