import NotificationIcon from '../../resources/notification.jpg';

const SystemNotification = (title, body, isSilent, callback = null) => {
  const notification = new Notification(title, {
    body,
    silent: isSilent,
    icon: process.platform !== 'darwin' ? NotificationIcon : null,
  });
  notification.onclick = () => {
    callback();
  };
};

export default SystemNotification;
