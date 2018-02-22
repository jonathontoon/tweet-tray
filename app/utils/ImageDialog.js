import fs from 'fs';
import path from 'path';
import { ipcRenderer, remote, } from 'electron';
import LocaleManager from './LocaleManager';

const { dialog, } = remote;

const localeManager = LocaleManager();

// Abstract file data and return an object
const processFile = (filePath, callback) => {
  const imageSize = fs.lstatSync(filePath).size / (1024 * 1024);
  const base64ImageData = fs.readFileSync(filePath).toString('base64');

  const imageDataObject = {
    path: filePath,
    data: base64ImageData,
    size: imageSize,
    extension: path.extname(filePath),
  };

  callback(imageDataObject);
};

// Handle image selection and warning dialogs
const ImageDialog = (callback) => {
  ipcRenderer.send('toggleVisible', true);
  const properties = ['openFile', ];

  // Only Mac OSX supports the openDirectory option for file dialogs
  if (process.platform === 'darwin') {
    properties.push('openDirectory');
  }

  dialog.showOpenDialog({
    title: localeManager.image_dialog.title,
    buttonLabel: localeManager.image_dialog.add_button,
    filters: [
      { name: localeManager.image_dialog.file_type, extensions: ['jpeg', 'jpg', 'png', 'gif', ], },
    ],
    properties,
  }, (filePaths) => {
    if (filePaths !== undefined) {
      processFile(filePaths[0], (image) => {
        if (image.extension === '.gif' && image.size >= 10.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: [localeManager.image_dialog.warning_confirm_button, ],
            title: localeManager.image_dialog.warning_title,
            message: localeManager.image_dialog.warning_message,
            detail: localeManager.image_dialog.warning_detail_gif,
          }, () => {
            ipcRenderer.send('toggleVisible', false);
          });
        } else if (image.extension !== '.gif' && image.size >= 5.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: [localeManager.image_dialog.warning_confirm_button, ],
            title: localeManager.image_dialog.warning_title,
            message: localeManager.image_dialog.warning_message,
            detail: localeManager.image_dialog.warning_detail_images,
          }, () => {
            ipcRenderer.send('toggleVisible', false);
          });
        } else {
          ipcRenderer.send('toggleVisible', false);
          callback(image);
        }
      });
    } else {
      ipcRenderer.send('toggleVisible', false);
    }
    ipcRenderer.send('showWindow');
  });
};

export default ImageDialog;
