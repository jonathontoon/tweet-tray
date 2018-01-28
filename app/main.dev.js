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
import path from 'path';
import { app, ipcMain, } from 'electron';

import MainWindowManager from './utils/MainWindowManager';

const mainWindowManager = new MainWindowManager();

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

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  mainWindowManager.initTray();
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  mainWindowManager.initTray();
});

// Start Twitter OAuth Flow
ipcMain.on('startOAuth', (startOAuthEvent) => {
  mainWindowManager.oauthManager.getRequestTokenPair((requestTokenPairError, requestTokenPair) => {
    if (requestTokenPairError) {
      mainWindowManager.oauthManager.destroyWindow();
      return;
    }

    startOAuthEvent.sender.send('receivedRequestTokenPair', requestTokenPair);

    mainWindowManager.oauthManager.window.on('close', () => {
      startOAuthEvent.sender.send('canceledOAuth');
    });

    mainWindowManager.oauthManager.window.webContents.on('did-navigate', (event, webContentsURL) => {
      const urlInfo = url.parse(webContentsURL, true);
      if (urlInfo.pathname === '/oauth/authenticate') {
        startOAuthEvent.sender.send('startedCodeVerification');
      }
    });
  });
});

// Get Verifier Code
ipcMain.on('sendVerifierCode', (sendVerifierCodeEvent, data) => {
  mainWindowManager.oauthManager.getAccessTokenPair(
    data.requestTokenPair,
    data.verifierCode,
    (accessTokenPairError, accessTokenPair) => {
      if (accessTokenPairError) {
        mainWindowManager.oauthManager.destroyWindow();
        return;
      }

      mainWindowManager.oauthManager.verifyCredentials(
        accessTokenPair,
        (credentialsError, credentials) => {
          if (credentialsError) {
            return;
          }

          mainWindowManager.oauthManager.destroyWindow();

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

  if (response.imageData) {
    mainWindowManager.oauthManager.uploadMedia({
      media: response.imageData,
    }, accessToken, accessTokenSecret, (uploadMediaError, uploadResponse) => {
      if (uploadMediaError) {
        console.log(uploadMediaError);
      }

      mainWindowManager.oauthManager.updateStatus({
        status: response.statusText,
        media_ids: uploadResponse.media_id_string,
      }, accessToken, accessTokenSecret, (updateStatusError, statusResponse) => {
        if (updateStatusError) {
          console.log(updateStatusError);
        }
        postStatusEvent.sender.send('postStatusComplete', statusResponse);
      });
    });
  } else {
    mainWindowManager.oauthManager.updateStatus({
      status: response.statusText,
    }, accessToken, accessTokenSecret, (updateStatusError, statusResponse) => {
      if (updateStatusError) {
        console.log(updateStatusError);
      }
      postStatusEvent.sender.send('postStatusComplete', statusResponse);
    });
  }
});

ipcMain.on('returnToLogin', () => {
  if (mainWindowManager.oauthManager.window !== null) {
    mainWindowManager.oauthManager.destroyWindow();
  }
});

ipcMain.on('quitApplication', () => {
  app.quit();
});

ipcMain.on('addImage', (addImageEvent) => {
  mainWindowManager.openImageDialog((image) => {
    addImageEvent.sender.send('addImageComplete', image);
  });
});

ipcMain.on('addGIF', (addImageEvent) => {
  mainWindowManager.openGIFDialog((gif) => {
    addImageEvent.sender.send('addGIFComplete', gif);
  });
});

