import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { ActionsEntries } from 'renderer/entries/actions';
import { Action } from 'redux-act';
import { EntriesType } from 'renderer/entries/model';
import { eventChannel } from 'redux-saga';

const {ipcRenderer} = (window as any).require('electron');


function requestActivities() {
    return eventChannel(emitter => {
            ipcRenderer.on('update-activities', (event, activities) => {
                emitter(activities)
            });
            return () => {};
        }
    )
}

function* loading(action: Action<{ entryName: EntriesType }>) {
    if (action.payload.entryName === EntriesType.activity) {
        ipcRenderer.send('dom-ready');
        const chanelActivities = yield call(requestActivities)
        while (true) {
            let activities = yield take(chanelActivities)
            yield put(ActionsEntries.loading.SUCCESS({entryName: EntriesType.activity, entry: activities}))
        }
    }
}

function* watcher() {
    yield all([
        takeEvery(ActionsEntries.loading.REQUEST.toString(), loading),
    ]);
}

export default [watcher];
