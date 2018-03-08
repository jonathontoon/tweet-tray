import NotificationIcon from '../../resources/notification.jpg';

class NotificationManager {
  constructor() {
    this.send = this.send.bind(this);
  }

  send = (title, body, isSilent, callback = null) => {
    const notification = new Notification(title, {
      body,
      silent: isSilent,
      icon: NotificationIcon,
    });
    notification.onclick = () => {
      if (callback === null) {
        notification.close();
      } else {
        callback();
      }
    };
  }
}

export default NotificationManager;
