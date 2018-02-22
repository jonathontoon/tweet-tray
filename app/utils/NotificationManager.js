import NotificationIcon from '../../resources/notification.jpg';

class NotificationManager {
  constructor() {
    this.send = this.send.bind(this);
  }

  send(title, body, isSilent, callback) {
    const notification = new Notification(title, {
      body,
      silent: isSilent,
      icon: NotificationIcon,
    });
    notification.onclick = () => {
      callback();
    };
  }
}

export default NotificationManager;
