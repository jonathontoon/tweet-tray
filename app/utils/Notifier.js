const { remote, } = window.require('electron');
const { app, } = remote;

const Notifier = (title, body, isSilent = false, callback) => {
  app.setAppUserModelId('org.jonathontoon.tweettray');
  const notification = new Notification(title, {
    body,
    silent: isSilent,
  });
  notification.onclick = () => {
    callback();
  };
};

export default Notifier;
