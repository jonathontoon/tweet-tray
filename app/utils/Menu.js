import { Menu, } from 'electron';

const SelectionMenu = Menu.buildFromTemplate([
  { role: 'copy', accelerator: 'CmdOrCtrl+C', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'CmdOrCtrl+A', },
]);

const InputMenu = Menu.buildFromTemplate([
  { role: 'undo', accelerator: 'CmdOrCtrl+Z', },
  { role: 'redo', accelerator: 'Shift+CmdOrCtrl+Z', },
  { type: 'separator', },
  { role: 'cut', accelerator: 'CmdOrCtrl+X', },
  { role: 'copy', accelerator: 'CmdOrCtrl+C', },
  { role: 'paste', accelerator: 'CmdOrCtrl+V', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'CmdOrCtrl+A', },
]);

const ApplicationMenu = (menuBarManager) => {
  return Menu.buildFromTemplate([{
    label: 'File',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Enter',
      selector: 'undo:',
      click: () => {
        if (menuBarManager.window !== null && menuBarManager.isWindowVisible()) {
          menuBarManager.window.webContents.send('send-tweet-shortcut');
        }
      },
    }, ],
  }, {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:', },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:', },
      { type: 'separator', },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:', },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:', },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:', },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:', },
    ],
  }, ]);
};

export default {
  SelectionMenu,
  InputMenu,
  ApplicationMenu,
};
