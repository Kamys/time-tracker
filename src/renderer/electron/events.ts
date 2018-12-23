import { store } from 'renderer/store';

const {ipcRenderer} = (window as any).require('electron');

export const subscribeCloseApp = () => {
    ipcRenderer.on('close-app-request', () => {
        saveStore(store.getState())
        ipcRenderer.send('close-app');
    });
}

export const subscribeUpdateActivities = (callback) => {
    ipcRenderer.on('update-activities', callback);
}

export const saveStore = (store) => {
    ipcRenderer.send('save-store', store);
}

export const loadStore = async () => {
    ipcRenderer.send('load-store-request');
    const loadStorePromise = new Promise((resolve) => {
        ipcRenderer.on('load-store', (event, store) => {
            resolve(store)
        });
    })
    return await loadStorePromise
}
