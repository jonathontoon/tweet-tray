const { remote, } = window.require('electron');
const { app, } = remote;

const Notifier = (title, body, isSilent = false, iconImage, callback) => {
  app.setAppUserModelId('org.jonathontoon.tweettray');
  const notification = new Notification(title, {
    body,
    silent: isSilent,
    icon: process.platform === 'darwin' ? null : iconImage,
  });
  notification.onclick = () => {
    callback();
  };
};

export default Notifier;
