import * as loadDevTool from 'electron-load-devtool';
import {app, BrowserWindow, ipcMain, Menu, nativeImage, screen, Tray} from 'electron';
import storage from './storage';
import trackActivities from './trackActivities';
import * as icon from 'src/assert/icon.png';
import {STORAGE_KEY} from "main/storage/constant";

const path = require('path');

let win = null;
let tray;
let forceQuit = false;
const isProduction = process.env.NODE_ENV === 'production';

const destructionApp = () => {
    win = null
    trackActivities.destruction();
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

    if (isProduction) {
        win.loadFile(path.join(__dirname, './index.html'))
    } else {
        win.loadURL('http://localhost:8000/')
    }

    const reduxStore = storage.get(STORAGE_KEY.app);
    console.log('reduxStore: ', reduxStore);
    let newActivities = reduxStore.entries.activity;
    trackActivities.setActivities(newActivities)

    win.on('closed', destructionApp)
    win.on('close', (event) => {
        if (win) {
            event.preventDefault()
            if (!forceQuit) {
                win.hide()
            } else {
                win.webContents.send('close-app-request');
            }
        }
    })

    win.webContents.once('dom-ready', () => {
        trackActivities.subscribe(activities => {
            if (win) {
                win.webContents.send('change-activities', activities);
            }
        })
    })

    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
}

const createListeners = () => {
    ipcMain.on('save-store', (action, store) => {
        storage.set(STORAGE_KEY.app, store)
    })

    ipcMain.on('load-store-request', () => {
        const store = storage.get(STORAGE_KEY.app);
        win.webContents.send('load-store', store);
    })

    ipcMain.on('close-app', () => {
        win = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

app.on('ready', () => {
    createWindow();
    createTray();
    createListeners()
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
