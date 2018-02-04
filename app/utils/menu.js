import { Menu, } from 'electron';

// const applicationMenu = new Menu();

// menu.append(new MenuItem({
//   label: 'Print',
//   accelerator: 'CmdOrCtrl+P',
//   click: () => { console.log('time to print stuff') }
// }));

const selectionMenu = Menu.buildFromTemplate([
  { role: 'copy', accelerator: process.platform === 'darwin' ? 'Cmd+C' : 'Ctrl+C', },
  { type: 'separator', },
  { role: 'selectall', accelerator: process.platform === 'darwin' ? 'Cmd+A' : 'Ctrl+A', },
]);

const inputMenu = Menu.buildFromTemplate([
  { role: 'undo', accelerator: process.platform === 'darwin' ? 'Cmd+Z' : 'Ctrl+Z', },
  { role: 'redo', accelerator: process.platform === 'darwin' ? 'Ctrl+Z' : 'Ctrl+Shift+Z', },
  { type: 'separator', },
  { role: 'cut', accelerator: process.platform === 'darwin' ? 'Cmd+X' : 'Ctrl+X', },
  { role: 'copy', accelerator: process.platform === 'darwin' ? 'Cmd+C' : 'Ctrl+C', },
  { role: 'paste', accelerator: process.platform === 'darwin' ? 'Cmd+P' : 'Ctrl+P', },
  { type: 'separator', },
  { role: 'selectall', accelerator: process.platform === 'darwin' ? 'Cmd+A' : 'Ctrl+A', },
]);

export default {
  selectionMenu,
  inputMenu,
};
