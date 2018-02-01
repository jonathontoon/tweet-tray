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
import IS_DEV from 'electron-is-dev';
import { app, ipcMain, BrowserWindow, Tray, Menu, dialog, screen, } from 'electron';

import OAuthManager from './utils/OAuthManager';
import config from './utils/config';

let oauthManager = null;
let windowManager = null;
let trayManager = null;
let windowPositioner = null;

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

const showWindow = () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const trayBounds = trayManager.getBounds();
  let trayPosition = null;
  let windowPosition = null;

  const halfScreenWidth = screenSize.width / 2;
  const halfScreenHeight = screenSize.height / 2;

  if (process.platform !== 'darwin') {
    if (trayBounds.x < halfScreenWidth && trayBounds.y > halfScreenHeight && trayBounds.height === 32) {
      trayPosition = 'trayBottomLeft';
      windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
      windowManager.setPosition(windowPosition.x + 78, windowPosition.y - 10);
    } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight && trayBounds.height === 32) {
      trayPosition = 'trayBottomRight';
      windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
      windowManager.setPosition(windowPosition.x - 8, windowPosition.y - 10);
    } else if (trayBounds.x > halfScreenWidth && trayBounds.y < halfScreenHeight && trayBounds.height === 40) {
      trayPosition = 'trayCenter';
      windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
      windowManager.setPosition(windowPosition.x, windowPosition.y + 6);
    } else if (trayBounds.x > halfScreenWidth && trayBounds.y > halfScreenHeight && trayBounds.height === 40) {
      trayPosition = 'trayBottomCenter';
      windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
      windowManager.setPosition(windowPosition.x, windowPosition.y - 6);
    }
  } else {
    trayPosition = 'trayCenter';
    windowPosition = windowPositioner.calculate(trayPosition, trayBounds);
    windowManager.setPosition(windowPosition.x, windowPosition.y);
  }

  windowManager.show();
  trayManager.setHighlightMode('always');
};

const hideWindow = () => {
  windowManager.hide();
  trayManager.setHighlightMode('never');
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 348,
    height: 520,
    resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: `${__dirname}\\includes\\icon.ico`,
    backgroundThrottling: false,
  });
  window.loadURL(`file://${__dirname}/app.html`);
  window.setMenu(null);

  window.on('blur', () => {
    if (oauthManager.window && oauthManager.window.isVisible()) return;
    if (!window && !window.isVisible()) return;
    hideWindow();
  });

  window.once('ready-to-show', () => {
    if (!window) {
      throw new Error('"window" is not defined');
    }

    if (IS_DEV) {
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
  const tray = new Tray(`${__dirname}\\includes\\tray.ico`);
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Quit Tweet Tray',
    click: () => {
      app.quit();
    },
  }, ]);
  tray.setToolTip('Tweet Tray');
  tray.setContextMenu(contextMenu);

  if (oauthManager === null) {
    oauthManager = new OAuthManager(config, windowManager);
  }

  tray.on('click', () => {
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
        callback(image);
      });
    }
    windowManager.show();
  });
};

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  windowManager = createWindow();
  trayManager = createTray();
});

// Start Twitter OAuth Flow
ipcMain.on('startOAuth', (startOAuthEvent) => {
  oauthManager.getRequestTokenPair((requestTokenPairError, requestTokenPair) => {
    if (requestTokenPairError) {
      oauthManager.destroyWindow();
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
        startOAuthEvent.sender.send('startedCodeVerification');
      }
    });
  });
});

// Get Verifier Code
ipcMain.on('sendVerifierCode', (sendVerifierCodeEvent, data) => {
  oauthManager.getAccessTokenPair(
    data.requestTokenPair,
    data.verifierCode,
    (accessTokenPairError, accessTokenPair) => {
      if (accessTokenPairError) {
        oauthManager.destroyWindow();
        sendVerifierCodeEvent.sender.send('sendVerifierCodeError');
        return;
      }

      oauthManager.verifyCredentials(
        accessTokenPair,
        (credentialsError, credentials) => {
          if (credentialsError) {
            oauthManager.destroyWindow();
            sendVerifierCodeEvent.sender.send('verifyCredentialsError');
            return;
          }

          oauthManager.destroyWindow();

          const userCredentials = {
            name: credentials.name,
            screenName: credentials.screen_name,
            location: credentials.location,
            description: credentials.description,
            utcOffset: credentials.utc_offset,
            timeZone: credentials.time_zone,
            geoEnabled: credentials.geo_enabled,
            lang: credentials.land,
            profileImageURL: credentials.profile_image_url_https,
          };

          sendVerifierCodeEvent.sender.send('completedOAuth', {
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

  windowManager.hide();

  if (response.imageData) {
    oauthManager.uploadMedia({
      media: response.imageData,
    }, accessToken, accessTokenSecret, (uploadMediaError, uploadResponse) => {
      if (uploadMediaError) {
        oauthManager.destroyWindow();
        postStatusEvent.sender.send('postStatusError', uploadResponse);
        return;
      }

      oauthManager.updateStatus({
        status: response.statusText,
        media_ids: uploadResponse.media_id_string,
      }, accessToken, accessTokenSecret, (updateStatusError, statusResponse) => {
        if (updateStatusError) {
          oauthManager.destroyWindow();
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
        oauthManager.destroyWindow();
        postStatusEvent.sender.send('postStatusError', statusResponse);
        return;
      }
      postStatusEvent.sender.send('postStatusComplete', statusResponse);
    });
  }
});

ipcMain.on('returnToLogin', () => {
  if (oauthManager.window !== null) {
    oauthManager.destroyWindow();
  }
});

ipcMain.on('quitApplication', () => {
  app.quit();
});

ipcMain.on('addImage', (addImageEvent) => {
  openImageDialog((image) => {
    addImageEvent.sender.send('addImageComplete', image);
  });
});

