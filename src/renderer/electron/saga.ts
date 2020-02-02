import { all, call, put, takeEvery, take, select } from 'redux-saga/effects'
import { ActionsElectron } from 'renderer/electron/actions'
import { loadStore, subscribeCloseApp, subscribeUpdateActivity } from 'renderer/electron/events'
import { eventChannel } from 'redux-saga'
import { findIndex } from 'lodash'
import { ActionsEntries } from 'renderer/entries/actions'
import { IActivity } from 'common/types/domain'
import { getActivities } from '../activity/selectors'

function* loading() {
  yield call(subscribeCloseApp)
  const store = yield call(loadStore)
  yield put(ActionsElectron.loadStore.SUCCESS({ store }))
  yield call(subscribeActivity)
}

const activityChannel = eventChannel(subscribeUpdateActivity)

const updateActivities = (activities: IActivity[], activity: IActivity): IActivity[] => {
  const updatedIndex = findIndex(activities, { title: activity.title })
  const updateActivity = activities[updatedIndex]
  const clearActivity = activities.filter(item => item.title !== activity.title)
  const secondsSpent = updateActivity ? updateActivity.secondsSpent : 0
  return [
    {
      ...activity,
      secondsSpent: secondsSpent + 1,
      lastUpdate: new Date().valueOf()
    },
    ...clearActivity
  ]
}

function* subscribeActivity() {
  while (true) {
    const activity = yield take(activityChannel)
    const activities = yield select(getActivities)
    const newActivities = updateActivities(activities, activity)
    yield put(
        ActionsEntries.loading.SUCCESS({
          entityName: 'activity',
          entity: newActivities,
        }),
    )
  }
}

export default function*() {
  return yield all([
    takeEvery(ActionsElectron.loadStore.REQUEST.toString(), loading),
  ])
}
