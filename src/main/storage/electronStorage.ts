import * as electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { STORAGE_KEY } from './constant';


class Store {
    constructor(opts) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, opts.configName + '.json');

        this.data = parseDataFile(this.path, opts.defaults);
    }

    data = null;
    path = null;

    get(key) {
        return this.data[key];
    }

    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath) as any);
    } catch (error) {
        return defaults;
    }
}

const store = new Store({
    configName: 'mainStore',
    defaults: {
        [STORAGE_KEY.app]: {
            entries: {
                activity: [],
                group: [],
            }
        },
    }
});

export default store;
