import path from 'path';

const { remote, } = window.require('electron');
const { app, } = remote;

const appIconImage = () => {
  let appIconImagePath = path.join(__dirname, '../resources/1024x1024.png');
  if (process.platform === 'darwin') {
    appIconImagePath = path.join(__dirname, '../resources/icon.icns');
  }

  if (process.platform === 'win32') {
    appIconImagePath = path.join(__dirname, '../resources/icon.ico');
  }

  return appIconImagePath;
};

const Notifier = (title, body, isSilent = false, callback) => {
  app.setAppUserModelId('org.jonathontoon.tweettray');
  const notification = new Notification(title, {
    body,
    silent: isSilent,
    icon: appIconImage(),
  });
  notification.onclick = () => {
    callback();
  };
};

export default Notifier;
