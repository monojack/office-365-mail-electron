module.exports = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        selector: 'undo:',
        role: 'undo',
      },
      {
        label: 'Redo',
        selector: 'redo:',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        selector: 'cut:',
        role: 'cut',
      },
      {
        label: 'Copy',
        selector: 'copy:',
        role: 'copy',
      },
      {
        label: 'Paste',
        selector: 'paste:',
        role: 'paste',
      },
      {
        label: 'Select All',
        selector: 'selectAll:',
        role: 'selectall',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.loadURL('https://portal.microsoftonline.com');
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          }
          return 'Ctrl+Shift+I'
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        },
      },
    ],
  },
]
