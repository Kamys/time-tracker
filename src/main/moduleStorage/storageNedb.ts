import dataStoreProvider from './dataStoreProvider';

const db = dataStoreProvider.createDataStore();

const update = async (newActivities: any[], date: string) => {
    await db.remove({date}, { multi: true });
    return db.insert(newActivities);
};

const get = <T>(date): Promise<T> => {
    return db.cfind({ date })
        .sort({lastUpdate: -1})
        .exec();
};

export default {
    update,
    get,
};