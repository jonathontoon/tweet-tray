import path from 'path';
import { OAuth, } from 'oauth';
import electron, { BrowserWindow, } from 'electron';

class OAuthManager {
  constructor(config, mainWindow) {
    this.consumerKey = config.OAUTH_CONSUMER_KEY;
    this.consumerSecret = config.OAUTH_CONSUMER_SECRET;

    this.oauth = new OAuth(
      config.REQUEST_TOKEN_URL,
      config.ACCESS_TOKEN_URL,
      this.consumerKey,
      this.consumerSecret,
      '1.0A',
      config.CALLBACK_URL,
      'HMAC-SHA1'
    );

    this.authenticateURL = config.BASE_AUTHENTICATE_URL;

    this.window = null;
    this.isOAuthActive = false;
    this._mainWindow = mainWindow;

    this._createWindow = this._createWindow.bind(this);
    this.destroyWindow = this.destroyWindow.bind(this);

    this.getRequestTokenPair = this.getRequestTokenPair.bind(this);
    this.getAccessTokenPair = this.getAccessTokenPair.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.uploadMedia = this.uploadMedia.bind(this);
  }

  _createWindow() {
    const screenBounds = electron.screen.getPrimaryDisplay().bounds;
    const x = screenBounds.x + ((screenBounds.width - 380) / 2);
    const y = screenBounds.y + ((screenBounds.height - 580) / 2);

    const window = new BrowserWindow({
      width: 380,
      height: 520,
      x,
      y,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
      alwaysOnTop: true,
      resizable: true,
      title: 'Twitter / Authorize an application',
      icon: path.join(__dirname, '../../resources/icon.ico'),
    });
    window.setMenu(null);
    window.on('closed', () => {
      this.isOAuthActive = false;
      if (this._mainWindow !== null && this._mainWindow.isVisible()) {
        this._mainWindow.focus();
      }
    });
    window.on('show', () => {
      this.isOAuthActive = true;
    });
    window.on('hide', () => {
      this.isOAuthActive = false;
    });
    return window;
  }

  destroyWindow() {
    if (this.window !== null) {
      this.isOAuthActive = false;
      this.window.close();
    }
  }

  getRequestTokenPair(callback) {
    if (this.window === null) {
      this.window = this._createWindow();
    }

    this.oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
      if (error) {
        callback(error, null);
      } else {
        try {
          this.window.show();
          this.window.loadURL(this.authenticateURL + oauthToken);
          callback(null, {
            token: oauthToken,
            secret: oauthTokenSecret,
          });
        } catch (e) {
          callback(e, null);
        }
      }
    });
  }

  getAccessTokenPair(requestTokenPair, verifier, callback) {
    if (this.window === null) {
      this.window = this._createWindow();
    }

    this.oauth.getOAuthAccessToken(
      requestTokenPair.token, requestTokenPair.secret, verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret) => {
        if (error) {
          callback(error, null);
        } else {
          try {
            callback(null, {
              token: oauthAccessToken,
              secret: oauthAccessTokenSecret,
            });
          } catch (e) {
            callback(e, null);
          }
        }
      }
    );
  }

  verifyCredentials(accessTokenPair, callback) {
    this.oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json', accessTokenPair.token, accessTokenPair.secret, (error, data) => {
      if (error) {
        callback(error, data);
      } else {
        try {
          const parsedData = JSON.parse(data);
          callback(null, parsedData);
        } catch (e) {
          callback(e, data);
        }
      }
    });
  }

  updateStatus(params, accessToken, accessTokenSecret, callback) {
    this.oauth.post('https://api.twitter.com/1.1/statuses/update.json', accessToken, accessTokenSecret, params, (error, data) => {
      if (error) {
        callback(error, data);
      } else {
        try {
          const parsedData = JSON.parse(data);
          callback(null, parsedData);
        } catch (e) {
          callback(e, data);
        }
      }
    });
  }

  uploadMedia(params, accessToken, accessTokenSecret, callback) {
    this.oauth.post('https://upload.twitter.com/1.1/media/upload.json', accessToken, accessTokenSecret, params, (error, data) => {
      if (error) {
        callback(error, data);
      } else {
        try {
          const parsedData = JSON.parse(data);
          callback(null, parsedData);
        } catch (e) {
          callback(e, data);
        }
      }
    });

    // const parameter = (params.isBase64) ? 'media_data' : 'media';

    // // multipart/form-dauploadBaseUrlta
    // const form = r.form();
    // if (fs.existsSync(params.media)) {
    //   form.append(parameter, fs.createReadStream(params.media));
    // } else {
    //   form.append(parameter, params.media);
    // }
  }
}

export default OAuthManager;
