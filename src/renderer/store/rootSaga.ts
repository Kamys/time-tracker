import { fork } from 'redux-saga/effects';
import groups from 'renderer/page/Groups/saga';

function* rootSaga() {
  yield [
    ...groups.map(fork),
  ];
}

export default rootSaga;
