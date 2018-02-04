import { Menu, } from 'electron';

// const applicationMenu = new Menu();

// menu.append(new MenuItem({
//   label: 'Print',
//   accelerator: 'CmdOrCtrl+P',
//   click: () => { console.log('time to print stuff') }
// }));

const selectionMenu = Menu.buildFromTemplate([
  { role: 'copy', accelerator: 'Cmd+C', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'Cmd+A', },
]);

const inputMenu = Menu.buildFromTemplate([
  { role: 'undo', accelerator: 'Cmd+Z', },
  { role: 'redo', accelerator: 'Cmd+Shift+Z', },
  { type: 'separator', },
  { role: 'cut', accelerator: 'Cmd+X', },
  { role: 'copy', accelerator: 'Cmd+C', },
  { role: 'paste', accelerator: 'Cmd+P', },
  { type: 'separator', },
  { role: 'selectall', accelerator: 'Cmd+A', },
]);

export default {
  selectionMenu,
  inputMenu,
};
