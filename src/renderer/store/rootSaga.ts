import { call, all } from 'redux-saga/effects'

import activity from 'renderer/activity/saga'
import electron from 'renderer/electron/saga'

function* rootSaga() {
  return yield all([call(activity), call(electron)])
}

export default rootSaga
