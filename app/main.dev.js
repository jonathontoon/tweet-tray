/* eslint global-require: 0 */

/*
  Package Imports
*/

import url from 'url';
import path from 'path';
import { app, ipcMain, globalShortcut, } from 'electron';

import config from './Config';
import MenuBarManager from './MenuBarManager';
import OAuthManager from './OAuthManager';

/*
  Variables
*/

let menuBarManager = null;
let oauthManager = null;

/*
  Developer Tools Setup
*/

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

/*
  App Events
*/

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  menuBarManager = new MenuBarManager();
  oauthManager = new OAuthManager(config, menuBarManager);

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  globalShortcut.register('CmdOrCtrl+Alt+Shift+T', () => {
    if (!menuBarManager.isWindowVisible()) {
      menuBarManager.showWindow();
    } else {
      menuBarManager.hideWindow();
    }
  });

  globalShortcut.register(`${process.platform === 'darwin' ? 'Cmd' : 'Ctrl'}+Enter`, () => {
    if (menuBarManager.window !== null && menuBarManager.isWindowVisible()) {
      windowManager.window.webContents.send('send-tweet-shortcut');
    }
  });
});

// Start Twitter OAuth Flow
ipcMain.on('startOAuth', (startOAuthEvent) => {
  menuBarManager.toggleAlwaysVisible(true);

  oauthManager.getRequestTokenPair((requestTokenPairError, requestTokenPair) => {
    if (requestTokenPairError) {
      startOAuthEvent.sender.send('startOAuthError');
      return;
    }

    startOAuthEvent.sender.send('receivedRequestTokenPair', requestTokenPair);

    oauthManager.window.on('close', () => {
      menuBarManager.toggleAlwaysVisible(false);
      startOAuthEvent.sender.send('canceledOAuth');
    });

    oauthManager.window.webContents.on('did-navigate', (event, webContentsURL) => {
      const urlInfo = url.parse(webContentsURL, true);
      if (urlInfo.pathname === '/oauth/authenticate') {
        startOAuthEvent.sender.send('startedAuthorizationCode');
      }
    });
  });
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

  menuBarManager.hideWindow();

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
  app.quit();
});

ipcMain.on('toggleVisible', (addImageEvent, bool) => {
  menuBarManager.toggleAlwaysVisible(bool);
});

ipcMain.on('showWindow', () => {
  menuBarManager.showWindow();
});
