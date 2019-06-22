import * as electron from 'electron';

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
