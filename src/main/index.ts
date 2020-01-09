import * as loadDevTool from 'electron-load-devtool';
import { app, BrowserWindow, ipcMain, Menu, nativeImage, screen, Tray } from 'electron';

import trayIconPath from 'src/assert/icon.png';
import { isProduction } from 'src/common/constant';
import { IRootState } from 'renderer/store/rootReducer';
import useStore from './moduleStorage';
import trackActivities from './trackActivities';
import * as path from 'path';

let win = null;
let tray;
let forceQuit = false;

const destructionApp = () => {
    win = null;
    trackActivities.destruction();
};

const createTray = () => {
    const trayIcon = path.join(__dirname, trayIconPath);
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open', type: 'normal', click: () => win.show(),
        },
        {
            label: 'Exit', type: 'normal', click: () => {
                forceQuit = true;
                app.quit();
            },
        },
    ]);

    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
};

const recordActivity = () => {
    useStore('activity').get()
        .then(activities => {
            trackActivities.setActivities(activities);
        })
        .then(() => {
            win.webContents.once('dom-ready', () => {
                console.log('startRecordActivities!');
                trackActivities.startRecordActivities();
                setInterval(() => {
                    const activities = trackActivities.getActivities();
                    useStore('activity').update(activities);
                }, 5 * 1000);
            });
        });
};

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        width: width - 500,
        height: height - 200,
        title: 'Time Tracker',
        center: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (isProduction) {
        win.loadFile(path.join(__dirname, './index.html'));
    } else {
        win.loadURL('http://localhost:8000/');
    }

    win.on('closed', destructionApp);
    win.on('close', event => {
        if (win) {
            event.preventDefault();
            if (!forceQuit) {
                win.hide();
            } else {
                win.webContents.send('close-app-request');
            }
        }
    });

    recordActivity();
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
};

const createListeners = () => {
    ipcMain.on('get-activities-request', (action, props) => {
        console.log('get-activities-request: ');
        useStore('activity').get()
            .then(activities => {
                console.log('activities: ', activities);
                win.webContents.send('get-activities-success', activities);
            });
    });

    ipcMain.on('load-store-request', () => {
        const loadingActivity = useStore('activity').get();
        const loadingGroup = useStore('group').get();

        Promise.all([loadingActivity, loadingGroup])
            .then(([activity, group]) => {
                const store = {
                    entries: {
                        activity,
                        group,
                    },
                };
                win.webContents.send('load-store', store);
            });
    });

    ipcMain.on('close-app', () => {
        win = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    ipcMain.on('save-store', (action, store: IRootState) => {
        const { activity, group } = store.entries;
        useStore('activity').update(activity);
        useStore('group').update(group);
    });
};

app.on('ready', () => {
    createWindow();
    createTray();
    createListeners();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
