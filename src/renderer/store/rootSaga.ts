import { fork } from 'redux-saga/effects';

import activity from 'renderer/activity/saga';
import electron from 'renderer/electron/saga';

function* rootSaga() {
  yield [
    ...activity.map(fork),
    ...electron.map(fork),
  ];
}

export default rootSaga;
