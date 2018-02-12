import Positioner from 'electron-positioner';
import path from 'path';
import { app, BrowserWindow, Tray, screen, nativeImage, Menu, } from 'electron';
import { selectionMenu, inputMenu, applicationMenu, } from './utils/Menu';

class MenuBarManager {
  constructor() {
    this.window = null;
    this._tray = null;
    this._windowPositioner = null;

    this._shouldWindowBeOpen = false;

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
    let trayIconImagePath = `${__dirname}/includes/icons/tray.ico`;
    if (process.platform === 'darwin') {
      trayIconImagePath = `${__dirname}/includes/icons/trayTemplate.png`;
    }

    if (process.platform === 'linux') {
      trayIconImagePath = `${__dirname}/includes/icons/tray.png`;
    }

    return nativeImage.createFromPath(trayIconImagePath);
  }

  static _getAppIcon() {
    let appIconImagePath = path.join(__dirname, '../resources/1024x1024.png');
    if (process.platform === 'darwin') {
      appIconImagePath = path.join(__dirname, '../resources/icon.icns');
    }

    if (process.platform === 'win32') {
      appIconImagePath = path.join(__dirname, '../resources/icon.ico');
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
      icon: MenuBarManager._getAppIcon(),
      backgroundThrottling: false,
    });
    this.window.loadURL(`file://${__dirname}/app.html`);
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
    this._tray = new Tray(MenuBarManager._getTrayIcon());
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
    const windowSize = this.window.getBounds();
    const trayBounds = this._tray.getBounds();

    const windowLength = (trayBounds.x + (trayBounds.width / 2)) + windowSize.width;
    const windowOutOfBounds = (windowLength > screenSize.width);

    let trayPosition = null;
    let windowPosition = null;
    let positionToSet = null;

    const halfScreenWidth = screenSize.width / 2;
    const halfScreenHeight = screenSize.height / 2;

    if (process.platform === 'win32') {
      // Vertical or Horizontal Taskbar

      // Vertical Taskbar, small icon mode isn't applicable
      if (trayBounds.height === 32) {
        if (trayBounds.x <= halfScreenWidth && trayBounds.y >= halfScreenHeight) {
          // Vertical Left Bottom

          trayPosition = 'trayBottomLeft';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          positionToSet = { x: windowPosition.x + 78, y: windowPosition.y - 10, };
        } else if (trayBounds.x >= halfScreenWidth && trayBounds.y >= halfScreenHeight) {
          // Vertical Right Bottom

          trayPosition = 'trayBottomRight';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          positionToSet = { x: windowPosition.x - 8, y: windowPosition.y - 10, };
        }

        // Horizontal Taskbar
        // Supporting small or regular sized icons
      } else if (trayBounds.height === 30 || trayBounds.height === 40) {
        // Is bottom or top
        if (trayBounds.x >= halfScreenWidth && trayBounds.y >= halfScreenHeight) {
          // Horizontal Bottom Left

          trayPosition = 'trayBottomCenter';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          positionToSet = { x: windowPosition.x, y: windowPosition.y - 6, };
        } else if (trayBounds.x >= halfScreenWidth && trayBounds.y === 0) {
          // Horizontal Top Left

          trayPosition = 'trayCenter';
          windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
          positionToSet = { x: windowPosition.x, y: windowPosition.y + 6, };
        }
      }

      // Account for the window potentially getting clipped if it's too far right
      if (windowOutOfBounds) {
        positionToSet = { x: positionToSet.x - 7, y: positionToSet.y, };
      }

    } else {
      trayPosition = 'trayCenter';
      windowPosition = this._windowPositioner.calculate(trayPosition, trayBounds);
      positionToSet = { x: windowPosition.x, y: windowPosition.y + 20, };

      // Account for the window potentially getting clipped if it's too far right
      if (windowOutOfBounds) {
        positionToSet = { x: positionToSet.x - 20, y: positionToSet.y, };
      }
    }

    this.window.setPosition(positionToSet.x, positionToSet.y);

    if (process.platform === 'darwin') { this._tray.setHighlightMode('always'); }
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
