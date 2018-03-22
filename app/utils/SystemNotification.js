import NotificationIcon from '../../resources/notification.jpg';

const SystemNotification = (title, body, isSilent, callback = null) => {
  console.log('qweqweqwe');
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
