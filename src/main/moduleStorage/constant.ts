import * as electron from "electron";

export enum STORAGE_KEY {
    app = 'app',
}

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
