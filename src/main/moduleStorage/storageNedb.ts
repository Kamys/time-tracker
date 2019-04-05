import {STORAGE_KEY, userDataPath} from 'main/moduleStorage/constant';
import * as path from 'path';

import * as Datastore from 'nedb-promise';

const databaseFilePath = path.join(userDataPath, 'appStorage/main');

const db = new Datastore({
    filename: databaseFilePath,
});

db.loadDatabase(err => {
    // tslint:disable-next-line:no-console
    console.error('Happened error in nedb: ', err);
});

const itemsOnPage = 15;

const insert = <T>(entity: T): Promise<T> => {
    console.log('db insert: ', entity);
    return db.insert(entity);
};

const get = <T>(page): Promise<T> => {
    return db.cfind({})
        .skip((page - 1) * itemsOnPage)
        .limit(itemsOnPage)
        .exec();
};

export default {
    set: insert,
    get,
};