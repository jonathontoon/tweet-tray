/* eslint global-require: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */

import url from 'url';
import fs from 'fs';
import path from 'path';
import Positioner from 'electron-positioner';
import {
  app,
  ipcMain,
  BrowserWindow,
  Tray,
  dialog,
  screen,
  nativeImage,
  Menu,
  globalShortcut,
} from 'electron';

import config from './utils/config';
import OAuthManager from './utils/OAuthManager';
import { selectionMenu, inputMenu, applicationMenu, } from './utils/menu';

let oauthManager = null;
let windowManager = null;
let trayManager = null;
let windowPositioner = null;

let isDialogOpen = false;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];

  return Promise
    .all(extensions.map((name) => {
      return installer.default(installer[name], forceDownload);
    }))
    .catch(console.log);
};

const trayIconImage = () => {
  let trayIconImagePath = `${__dirname}/includes/icons/tray.ico`;
  if (process.platform === 'darwin') {
    trayIconImagePath = `${__dirname}/includes/icons/trayTemplate.png`;
  }

  if (process.platform === 'linux') {
    trayIconImagePath = `${__dirname}/includes/icons/tray.png`;
  }

  return nativeImage.createFromPath(trayIconImagePath);
};

const appIconImage = () => {
  let appIconImagePath = path.join(__dirname, '../resources/1024x1024.png');
  if (process.platform === 'darwin') {
    appIconImagePath = path.join(__dirname, '../resources/icon.icns');
  }

  if (process.platform === 'win32') {
    appIconImagePath = path.join(__dirname, '../resources/icon.ico');
  }

  return nativeImage.createFromPath(appIconImagePath);
};

const showWindow = () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const trayBounds = trayManager.getBounds();
  let trayPosition = null;
  let windowPosition = null;

  const halfScreenWidth = screenSize.width / 2;
  const halfScreenHeight = screenSize.height / 2;

  if (process.platform !== 'darwin') {
    if (trayBounds.height === 32) {
      if (trayBounds.x < halfScreenWidth && trayBounds.y > halfScreenHeight) {
        trayPosition = 'trayBottomLeft';
        windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
        windowManager.setPosition(windowPosition.x + 78, windowPosition.y - 10);
      } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight) {
        trayPosition = 'trayBottomRight';
        windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
        windowManager.setPosition(windowPosition.x - 8, windowPosition.y - 10);
      }
    } else if (trayBounds.height === 40) {
      if (trayBounds.x > halfScreenWidth && trayBounds.y < halfScreenHeight) {
        trayPosition = 'trayCenter';
        windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
        windowManager.setPosition(windowPosition.x, windowPosition.y + 6);
      } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight) {
        trayPosition = 'trayBottomCenter';
        windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
        windowManager.setPosition(windowPosition.x, windowPosition.y - 6);
      }
    }
  } else {
    trayPosition = 'trayCenter';
    windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
    windowManager.setPosition(windowPosition.x, windowPosition.y + 20);
  }

  trayManager.setHighlightMode('always');
  windowManager.show();

  windowManager.webContents.send('focus-textarea');
};

const hideWindow = () => {
  if (oauthManager.isOAuthActive) return;
  if (isDialogOpen) return;
  if (!windowManager && !windowManager.isVisible()) return;
  trayManager.setHighlightMode('never');
  windowManager.hide();
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 348,
    height: 520,
    resizable: false,
    frame: false,
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: appIconImage(),
    backgroundThrottling: false,
  });
  window.loadURL(`file://${__dirname}/app.html`);
  window.setMenu(null);

  Menu.setApplicationMenu(applicationMenu);

  window.on('blur', () => {
    hideWindow();
  });

  window.webContents.on('context-menu', (e, props) => {
    const { selectionText, isEditable, } = props;
    if (isEditable) {
      inputMenu.popup(window);
    } else if (selectionText && selectionText.trim() !== '') {
      selectionMenu.popup(window);
    }
  });

  window.once('ready-to-show', () => {
    if (!window) {
      throw new Error('"window" is not defined');
    }

    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      window.webContents.openDevTools();
    }

    if (trayManager !== null) {
      showWindow();
    }
  });

  windowPositioner = new Positioner(window);

  return window;
};

const createTray = () => {
  const tray = new Tray(trayIconImage());
  tray.setToolTip(`Tweet Tray ${app.getVersion()}`);

  if (oauthManager === null) {
    oauthManager = new OAuthManager(config, windowManager);
  }

  tray.on('click' || 'right-click', () => {
    if (windowManager !== null && !windowManager.isVisible()) {
      if (windowManager !== null) {
        showWindow();
      }
    } else {
      hideWindow();
    }
  });

  return tray;
};

const processFile = (filePath, callback) => {
  const imageSize = fs.lstatSync(filePath).size / (1024 * 1024);
  const base64ImageData = fs.readFileSync(filePath).toString('base64');

  const imageDataObject = {
    path: filePath,
    data: base64ImageData,
    size: imageSize,
    extension: path.extname(filePath),
  };

  callback(imageDataObject);
};

const openImageDialog = (callback) => {
  const properties = ['openFile', ];

  // Only Mac OSX supports the openDirectory option for file dialogs
  if (process.platform === 'darwin') {
    properties.push('openDirectory');
  }

  dialog.showOpenDialog({
    title: 'Select an Image',
    buttonLabel: 'Add',
    filters: [
      { name: 'Images', extensions: ['jpeg', 'jpg', 'png', 'gif', ], },
    ],
    properties,
  }, (filePaths) => {
    if (filePaths !== undefined) {
      processFile(filePaths[0], (image) => {
        if (image.extension === '.gif' && image.size >= 15.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: ['OK', ],
            title: 'Warning',
            message: 'Oops, sorry you can\'t do that',
            detail: 'GIFs must be less than 15mb.',
          }, () => {
            callback(null);
          });
        } else if (image.extension !== '.gif' && image.size >= 5.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: ['OK', ],
            title: 'Warning',
            message: 'Oops, sorry you can\'t do that',
            detail: 'Images must be less than 5mb.',
          }, () => {
            callback(null);
          });
        } else {
          callback(image);
        }
      });
    } else {
      isDialogOpen = false;
    }
    windowManager.show();
  });
};

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  globalShortcut.register('CmdOrCtrl+Alt+Shift+T', () => {
    if (windowManager !== null && !windowManager.isVisible()) {
      showWindow();
    } else {
      hideWindow();
    }
  });

  globalShortcut.register(`${process.platform === 'darwin' ? 'Cmd' : 'Ctrl'}+Enter`, () => {
    if (windowManager !== null && windowManager.isVisible()) {
      windowManager.webContents.send('send-tweet-shortcut');
    }
  });

  windowManager = createWindow();
  trayManager = createTray();
});

// Start Twitter OAuth Flow
ipcMain.on('startOAuth', (startOAuthEvent) => {
  if (!oauthManager.isOAuthActive) {
    oauthManager.isOAuthActive = true;
    oauthManager.getRequestTokenPair((requestTokenPairError, requestTokenPair) => {
      if (requestTokenPairError) {
        console.log(requestTokenPairError);
        startOAuthEvent.sender.send('startOAuthError');
        return;
      }

      startOAuthEvent.sender.send('receivedRequestTokenPair', requestTokenPair);

      oauthManager.window.on('close', () => {
        startOAuthEvent.sender.send('canceledOAuth');
      });

      oauthManager.window.webContents.on('did-navigate', (event, webContentsURL) => {
        const urlInfo = url.parse(webContentsURL, true);
        if (urlInfo.pathname === '/oauth/authenticate') {
          startOAuthEvent.sender.send('startedAuthorizationCode');
        }
      });
    });
  }
});

// Get Authorize Code
ipcMain.on('sendAuthorizeCode', (sendAuthorizeCodeEvent, data) => {
  oauthManager.getAccessTokenPair(
    data.requestTokenPair,
    data.authorizeCode,
    (accessTokenPairError, accessTokenPair) => {
      if (accessTokenPairError) {
        sendAuthorizeCodeEvent.sender.send('sendAuthorizeCodeError');
        return;
      }

      oauthManager.verifyCredentials(
        accessTokenPair,
        (credentialsError, credentials) => {
          if (credentialsError) {
            sendAuthorizeCodeEvent.sender.send('verifyCredentialsError');
            return;
          }

          oauthManager.window.close();

          const userCredentials = {
            name: credentials.name,
            screenName: credentials.screen_name,
            location: credentials.location,
            description: credentials.description,
            utcOffset: credentials.utc_offset,
            timeZone: credentials.time_zone,
            geoEnabled: credentials.geo_enabled,
            lang: credentials.lang,
            profileImageURL: credentials.profile_image_url_https,
          };

          sendAuthorizeCodeEvent.sender.send('completedOAuth', {
            accessTokenPair,
            userCredentials,
          });
        }
      );
    }
  );
});

// Post Status
ipcMain.on('postStatus', (postStatusEvent, response) => {
  const accessToken = response.accessTokenPair.token;
  const accessTokenSecret = response.accessTokenPair.secret;

  hideWindow();

  if (response.imageData) {
    oauthManager.uploadMedia({
      media: response.imageData,
    }, accessToken, accessTokenSecret, (uploadMediaError, uploadResponse) => {
      if (uploadMediaError) {
        postStatusEvent.sender.send('postStatusError', uploadResponse);
        return;
      }

      oauthManager.updateStatus({
        status: response.statusText,
        media_ids: uploadResponse.media_id_string,
      }, accessToken, accessTokenSecret, (updateStatusError, statusResponse) => {
        if (updateStatusError) {
          postStatusEvent.sender.send('postStatusError', statusResponse);
          return;
        }
        postStatusEvent.sender.send('postStatusComplete', statusResponse);
      });
    });
  } else {
    oauthManager.updateStatus({
      status: response.statusText,
    }, accessToken, accessTokenSecret, (updateStatusError, statusResponse) => {
      if (updateStatusError) {
        postStatusEvent.sender.send('postStatusError', statusResponse);
        return;
      }
      postStatusEvent.sender.send('postStatusComplete', statusResponse);
    });
  }
});

ipcMain.on('returnToLogin', () => {
  oauthManager.window.close();
});

ipcMain.on('quitApplication', () => {
  hideWindow();
  app.quit();
});

ipcMain.on('addImage', (addImageEvent) => {
  isDialogOpen = true;
  openImageDialog((image) => {
    isDialogOpen = false;
    addImageEvent.sender.send('addImageComplete', image);
  });
});

