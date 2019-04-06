import electron from './importElectron';
import {store as reduxStore} from 'renderer/store';

const {ipcRenderer} = electron;

export const subscribeCloseApp = () => {
    ipcRenderer.on('close-app-request', () => {
        saveStore(reduxStore.getState());
        ipcRenderer.send('close-app');
    });
};

export const saveStore = store => {
    ipcRenderer.send('save-store', store);
};

export const loadStore = async () => {
    ipcRenderer.send('load-store-request');
    const loadStorePromise = new Promise(resolve => {
        ipcRenderer.on('load-store', (event, store) => {
            resolve(store);
        });
    });
    return await loadStorePromise;
};

export const getActivities = () => {
    return new Promise((resolve => {
        ipcRenderer.send('get-activities-request');
        ipcRenderer.on('get-activities-success', (event, activities) => {
            resolve(activities);
        });
    }));
};