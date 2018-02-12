import Positioner from 'electron-positioner';
import path from 'path';
import { app, BrowserWindow, Tray, screen, nativeImage, Menu, } from 'electron';
import { selectionMenu, inputMenu, applicationMenu, } from './Menu';

class MenuBarManager {
  constructor() {
    this.window = null;
    this._tray = null;
    this._windowPositioner = null;

    this._shouldWindowBeOpen = false;

    this._getAppIcon = this._getAppIcon.bind(this);
    this._getTrayIcon = this._getTrayIcon.bind(this);

    this._createWindow = this._createWindow.bind(this);
    this._createTray = this._createTray.bind(this);

    this.toggleAlwaysVisible = this.toggleAlwaysVisible.bind(this);

    this.showWindow = this.showWindow.bind(this);
    this.hideWindow = this.hideWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.isWindowVisible = this.isWindowVisible.bind(this);

    this._createWindow();
    this._createTray();
  }

  static _getTrayIcon() {
    let trayIconImagePath = path.join(__dirname, '../includes/icons/tray.ico');
    if (process.platform === 'darwin') {
      trayIconImagePath = path.join(__dirname, '../includes/icons/trayTemplate.png');
    }

    if (process.platform === 'linux') {
      trayIconImagePath = path.join(__dirname, '../includes/icons/tray.png');
    }

    return nativeImage.createFromPath(trayIconImagePath);
  }

  static _getAppIcon() {
    let appIconImagePath = path.join(__dirname, '../../resources/1024x1024.png');
    if (process.platform === 'darwin') {
      appIconImagePath = path.join(__dirname, '../../resources/icon.icns');
    }

    if (process.platform === 'win32') {
      appIconImagePath = path.join(__dirname, '../../resources/icon.ico');
    }

    return nativeImage.createFromPath(appIconImagePath);
  }

  _createWindow() {
    this.window = new BrowserWindow({
      width: 348,
      height: 520,
      resizable: false,
      frame: false,
      show: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      icon: null,
      backgroundThrottling: false,
    });
    this.window.loadURL(path.join(__dirname, '../app.html'));
    this.window.setMenu(null);

    Menu.setApplicationMenu(applicationMenu);

    this.window.on('blur', () => {
      this.hideWindow();
    });

    this.window.webContents.on('context-menu', (e, props) => {
      const { selectionText, isEditable, } = props;
      if (isEditable) {
        inputMenu.popup(this.window);
      } else if (selectionText && selectionText.trim() !== '') {
        selectionMenu.popup(this.window);
      }
    });

    this.window.once('ready-to-show', () => {
      if (this.window === null) {
        throw new Error('"window" is not defined');
      }

      if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        if (this.window !== undefined) {
          this.window.webContents.openDevTools();
        }
      }

      if (this._tray !== null) {
        this.showWindow();
      }
    });

    this._windowPositioner = new Positioner(this.window);
  }

  _createTray() {
    this._tray = new Tray(this._getTrayIcon());
    this._tray.setToolTip(`Tweet Tray ${app.getVersion()}`);


    this._tray.on('click' || 'right-click', () => {
      if (this.window !== null && !this.window.isVisible()) {
        if (this.window !== null) {
          this.showWindow();
        }
      } else {
        this.hideWindow();
      }
    });
  }

  toggleAlwaysVisible(bool) {
    if (this.window === null) return;
    this._shouldWindowBeOpen = bool;
  }

  showWindow() {
    if (this.isWindowVisible()) return;

    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const trayBounds = this._tray.getBounds();
    let trayPosition = null;
    let windowPosition = null;

    const halfScreenWidth = screenSize.width / 2;
    const halfScreenHeight = screenSize.height / 2;

    if (process.platform !== 'darwin') {
      if (trayBounds.height === 32) {
        if (trayBounds.x < halfScreenWidth && trayBounds.y > halfScreenHeight) {
          trayPosition = 'trayBottomLeft';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          this.window.setPosition(windowPosition.x + 78, windowPosition.y - 10);
        } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight) {
          trayPosition = 'trayBottomRight';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          this.window.setPosition(windowPosition.x - 8, windowPosition.y - 10);
        }
      } else if (trayBounds.height === 40) {
        if (trayBounds.x > halfScreenWidth && trayBounds.y < halfScreenHeight) {
          trayPosition = 'trayCenter';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          this.window.setPosition(windowPosition.x, windowPosition.y + 6);
        } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight) {
          trayPosition = 'trayBottomCenter';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          this.window.setPosition(windowPosition.x, windowPosition.y - 6);
        }
      }
    } else {
      trayPosition = 'trayCenter';
      windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
      this.window.setPosition(windowPosition.x, windowPosition.y + 20);
    }

    this._tray.setHighlightMode('always');
    this.window.show();

    this.window.webContents.send('focus-textarea');
  }

  hideWindow() {
    if (this.window === null) return;
    if (this._shouldWindowBeOpen === true) return;
    this._tray.setHighlightMode('never');
    this.window.hide();
  }

  closeWindow() {
    if (this.window === null) return;
    this.window.close();
  }

  isWindowVisible() {
    if (this.window === null) return;
    return this.window.isVisible();
  }
}

export default MenuBarManager;
