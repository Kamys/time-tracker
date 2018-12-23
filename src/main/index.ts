import * as loadDevTool from 'electron-load-devtool';
import * as path from 'path';
import { screen, app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron';

import storage from './storage';
import trackActivities from './trackActivities';
import * as icon from 'src/assert/icon.png';

let win = null;
let tray
let forceQuit = false;

const destructionApp = () => {
    win = null
    const activities = trackActivities.getActivities();
    trackActivities.destruction();
    storage.activities.set(activities);
}

const createTray = () => {
    const trayIcon = nativeImage.createFromDataURL(icon);
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open', type: 'normal', click: () => win.show()
        },
        {
            label: 'Exit', type: 'normal', click: () => {
                forceQuit = true;
                app.quit()
            }
        },
    ])

    tray.setHighlightMode('always');
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
}

const createWindow = () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
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
    win.on('close', (event) => {
        if (!forceQuit) {
            event.preventDefault()
            win.hide()
        }
    })

    win.webContents.once('dom-ready', () => {
        trackActivities.subscribe(activities => {
            win.webContents.send('update-activities', activities);
        })
    })

    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
}

app.on('ready', () => {
    createWindow();
    createTray();
})

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
