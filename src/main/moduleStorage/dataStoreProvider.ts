import * as Datastore from 'nedb-promise';
import * as path from 'path';
import { isProduction } from 'src/common/constant';
import { userDataPath } from './constant';

const getUserDataPath = () => {
    if (isProduction) {
        return path.join(userDataPath, 'appStorage/main');
    }

    return './dataBaseTest';
};

const createDataStore = () => {
    const filename = getUserDataPath();
    return Datastore({
        filename,
        autoload: true,
    });
};

export default {
    createDataStore,
};