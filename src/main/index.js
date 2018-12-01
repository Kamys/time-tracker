const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');
const startTrackActivities = require('./startTrackActivities');

let win

const createWindow = () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'Time Tracker',
    center: true,
  });
  // win.loadFile(path.join(__dirname, '../renderer/index.html'))
  win.loadURL('http://localhost:8000/')

  win.on('closed', () => {
    win = null
  })

  win.webContents.once('dom-ready', () => {
    startTrackActivities(activities => {
      win.webContents.send('update-activities', activities);
    })
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
