import fs from 'fs';
import path from 'path';
import LocaleManager from './LocaleManager';

const { renderProcess, dialog, } = window;

const localeManager = new LocaleManager();

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
  renderProcess.send('toggleVisible', true);
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
            renderProcess.send('toggleVisible', false);
          });
        } else if (image.extension !== '.gif' && image.size >= 5.0) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: [localeManager.image_dialog.warning_confirm_button, ],
            title: localeManager.image_dialog.warning_title,
            message: localeManager.image_dialog.warning_message,
            detail: localeManager.image_dialog.warning_detail_images,
          }, () => {
            renderProcess.send('toggleVisible', false);
          });
        } else {
          renderProcess.send('toggleVisible', false);
          callback(image);
        }
      });
    } else {
      renderProcess.send('toggleVisible', false);
    }
    renderProcess.send('showWindow');
  });
};

export default ImageDialog;
