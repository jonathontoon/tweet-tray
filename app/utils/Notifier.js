const { remote, } = window.require('electron');
const { app, } = remote;

const Notifier = (title, body, isSilent = false, icon, callback) => {
  app.setAppUserModelId('org.jonathontoon.tweettray');
  const notification = new Notification(title, {
    body,
    silent: isSilent,
    icon,
  });
  notification.onclick = () => {
    callback();
  };
};

export default Notifier;
