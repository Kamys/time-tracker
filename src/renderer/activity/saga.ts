import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { ActionsEntries } from 'renderer/entries/actions';
import { Action } from 'redux-act';
import { EntriesType } from 'renderer/entries/model';
import { eventChannel } from 'redux-saga';
import { subscribeUpdateActivities } from 'renderer/electron/events';


const requestActivities = () => eventChannel(emitter => {
        subscribeUpdateActivities((event, activities) => {
            emitter(activities)
        })
        return () => {
        };
    }
)

function* loading(action: Action<{ entryName: EntriesType }>) {
    if (action.payload.entryName === 'activity') {
        const chanelActivities = yield call(requestActivities)
        while (true) {
            let activities = yield take(chanelActivities)
            yield put(ActionsEntries.loading.SUCCESS({entryName: 'activity', entry: activities}))
        }
    }
}

function* watcher() {
    yield all([
        takeEvery(ActionsEntries.loading.REQUEST.toString(), loading),
    ]);
}

export default [watcher];
