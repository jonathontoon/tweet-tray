import NotificationIcon from '../../resources/notification.jpg';

class NotificationManager {
  constructor() {
    this.notification = null;
    this.send = this.send.bind(this);
  }

  send(title, body, isSilent = false, callback = null) {
    this.notification = new Notification(title, {
      body,
      silent: isSilent,
      icon: NotificationIcon,
    });
    this.notification.onclick = () => {
      callback();
    };
  }
}

export default NotificationManager;
