import NotificationIcon from '../../resources/notification.jpg';

const SystemNotification = (title, body, isSilent, callback = null) => {
  let notification = new Notification(title, {
    body,
    silent: isSilent,
    icon: process.platform !== 'darwin' ? NotificationIcon : null,
  });
  notification.onclick = () => {
    callback();
  };
  notification.onclose = () => {
    notification = null;
  };
};

export default SystemNotification;
