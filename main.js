const { app, shell, BrowserWindow, Menu, } = require('electron')
const path = require('path')

const config = {
  useContentSize: true,
  width: 1281,
  height: 800,
  center: true,
  backgroundColor: '#fff',
  title: 'Office 365 - Mail',
  icon: path.resolve(__dirname, 'assets/icons/png/256x256.png'),
  show: true,
  autoHideMenuBar: true,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: false,
    allowDisplayingInsecureContent: true,
    allowRunningInsecureContent: true,
    plugins: true,
    preload: path.resolve(__dirname, 'src/preload.js'),
  },
}

app.on('window-all-closed', function () {
  process.platform !== 'darwin' && app.quit()
})

app.on('ready', function () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(require('./src/menu')))

  let win = new BrowserWindow(config)
  win.loadURL('https://outlook.office365.com', {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  })
  win.on('closed', function () {
    win = null
  })

  win.webContents.on('new-window', function (event, url) {
    // outlook.office.com links should open in the electron container.
    if (url && !url.includes('outlook.office.com')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  })

  // Prevent copy and cut from being stolen by other hotkeys
  win.webContents.on('before-input-event', (e, input) => {
    if (input.key === 'c' && input.control) {
      win.webContents.copy();
      e.preventDefault();
      return false;
    }
    if (input.key === 'x' && input.control) {
      win.webContents.cut();
      e.preventDefault();
      return false;
    }
  })

  win.show()
})
