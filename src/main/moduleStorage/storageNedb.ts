import * as Datastore from 'nedb-promise';
import * as path from 'path';

import {userDataPath} from 'main/moduleStorage/constant';

const databaseFilePath = path.join(userDataPath, 'appStorage/main');

const db = Datastore({
    filename: './dataBaseTest',
    autoload: true,
});

const update = async (date: string, newActivities: any[]) => {
    await db.remove({date}, { multi: true });
    return db.insert(newActivities);
};

const get = <T>(date): Promise<T> => {
    return db.find({ date });
};

export default {
    update,
    get,
};