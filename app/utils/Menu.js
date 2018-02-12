import { Menu, } from 'electron';

const selectionMenu = Menu.buildFromTemplate([
  { role: 'copy', accelerator: 'CmdOrCtrl+C', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'CmdOrCtrl+A', },
]);

const inputMenu = Menu.buildFromTemplate([
  { role: 'undo', accelerator: 'CmdOrCtrl+Z', },
  { role: 'redo', accelerator: 'Shift+CmdOrCtrl+Z', },
  { type: 'separator', },
  { role: 'cut', accelerator: 'CmdOrCtrl+X', },
  { role: 'copy', accelerator: 'CmdOrCtrl+C', },
  { role: 'paste', accelerator: 'CmdOrCtrl+V', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'CmdOrCtrl+A', },
]);

const applicationMenu = Menu.buildFromTemplate([{
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
},
]);

export default {
  selectionMenu,
  inputMenu,
  applicationMenu,
};
