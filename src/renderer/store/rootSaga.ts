import { fork } from 'redux-saga/effects';
import groups from 'renderer/groups/saga';
import activity from 'renderer/activity/saga';

function* rootSaga() {
  yield [
    ...groups.map(fork),
    ...activity.map(fork),
  ];
}

export default rootSaga;
