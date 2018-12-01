const {app, BrowserWindow} = require('electron');
const path = require('path');

let win

const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadFile(path.join(__dirname, '../renderer/index.html'))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
