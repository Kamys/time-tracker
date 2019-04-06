import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionsEntries } from 'renderer/entries/actions';
import { Action } from 'redux-act';
import { EntriesType } from 'renderer/entries/model';
import { getActivities } from 'renderer/electron/events';

function* loading(action: Action<{ entityName: EntriesType }>) {
    if (action.payload.entityName === 'activity') {
        const activities = yield call(getActivities);
        yield put(ActionsEntries.loading.SUCCESS({entityName: 'activity', entity: activities}));
    }
}

function* watcher() {
    yield all([
        takeEvery(ActionsEntries.loading.REQUEST.toString(), loading),
    ]);
}

export default [watcher];
