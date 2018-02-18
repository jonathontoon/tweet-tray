const { remote, } = window.require('electron');
const { app, } = remote;

class Notifier {
  constructor() {
    app.setAppUserModelId('org.jonathontoon.tweettray');
  }

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

export default Notifier;
