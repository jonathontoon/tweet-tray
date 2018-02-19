import fs from 'fs';
import path from 'path';
import { ipcRenderer, remote, } from 'electron';
import Locales from './Locales';

const { dialog, } = remote;

const localeStrings = Locales();

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
    title: localeStrings.image_dialog.title,
    buttonLabel: localeStrings.image_dialog.add_button,
    filters: [
      { name: localeStrings.image_dialog.file_type, extensions: ['jpeg', 'jpg', 'png', 'gif', ], },
    ],
    properties,
  }, (filePaths) => {
    if (filePaths !== undefined) {
      processFile(filePaths[0], (image) => {
        if (image.extension === '.gif' && image.size >= 15.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: [localeStrings.image_dialog.warning_confirm_button, ],
            title: localeStrings.image_dialog.warning_title,
            message: localeStrings.image_dialog.warning_message,
            detail: localeStrings.image_dialog.warning_detail_gif,
          }, () => {
            ipcRenderer.send('toggleVisible', false);
          });
        } else if (image.extension !== '.gif' && image.size >= 5.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: [localeStrings.image_dialog.warning_confirm_button, ],
            title: localeStrings.image_dialog.warning_title,
            message: localeStrings.image_dialog.warning_message,
            detail: localeStrings.image_dialog.warning_detail_images,
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
