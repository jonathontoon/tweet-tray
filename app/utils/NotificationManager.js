class Notifier {

  static send(title, body, isSilent = false, callback = null) {
    const notification = new Notification(title, {
      body,
      silent: isSilent,
      icon: process.platform === 'darwin' ? null : '../../resources/notification.jpg',
    });
    notification.onclick = () => {
      callback();
    };
  }
}

const NotificationManager = () => {
  return new Notifier();
}

export default NotificationManager;
