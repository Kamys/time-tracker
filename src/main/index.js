const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');
const trackActivities = require('./trackActivities');
const storage = require('./storage');
const loadDevTool = require('electron-load-devtool');


let win

const destructionApp = () => {
  win = null
  const activities = trackActivities.getActivities();
  trackActivities.destruction();
  storage.activities.set(activities);
}

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

  trackActivities.setActivities(storage.activities.get())

  win.on('closed', destructionApp)

  win.webContents.once('dom-ready', () => {
    trackActivities.subscribe(activities => {
      win.webContents.send('update-activities', activities);
    })
  })

  loadDevTool(loadDevTool.REDUX_DEVTOOLS);
  loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
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
