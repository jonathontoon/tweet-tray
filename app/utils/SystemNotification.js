import NotificationIcon from '../../resources/notification.jpg';

const SystemNotification = (title, body, isSilent, callback = null) => {
  const notification = new Notification(title, {
    body,
    silent: isSilent,
    icon: NotificationIcon,
  });
  notification.onclick = () => {
    console.log('hello');
    callback();
  };
};

export default SystemNotification;
