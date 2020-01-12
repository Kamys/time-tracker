import { all, call, put, takeEvery } from 'redux-saga/effects'
import { ActionsElectron } from 'renderer/electron/actions'
import { loadStore, subscribeCloseApp } from 'renderer/electron/events'

function* loading() {
  yield call(subscribeCloseApp)
  const store = yield call(loadStore)
  yield put(ActionsElectron.loadingStore.SUCCESS({ store }))
}

export default function*() {
  return yield all([
    takeEvery(ActionsElectron.loadingStore.REQUEST.toString(), loading),
  ])
}
