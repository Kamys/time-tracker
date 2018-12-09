import { fork } from 'redux-saga/effects';
import groups from 'renderer/groups/saga';

function* rootSaga() {
  yield [
    ...groups.map(fork),
  ];
}

export default rootSaga;
