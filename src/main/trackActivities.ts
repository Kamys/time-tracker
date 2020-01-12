import * as moment from 'moment'
import * as activeWin from 'active-win/lib/linux'

import { ACTIVITY_DATE_FORMAT } from 'common/activity/constants'
import { IActivity } from 'common/types/domain'
import { findReplace } from 'common/utils'

let activities: IActivity[] = []
let interval = null
const intervalTime = 1

const updateActivity = (
  oldActivities: IActivity[],
  newActivity,
): IActivity[] => {
  const today = moment()
  const date = today.format(ACTIVITY_DATE_FORMAT)

  const isNewActivity = (activity: IActivity) => {
    return activity.date === date && newActivity.title === activity.title
  }

  const notFound = oldActivities => [
    {
      date,
      title: newActivity.title,
      secondsSpent: intervalTime,
      group: '',
      lastUpdate: today.valueOf(),
    },
    ...oldActivities,
  ]

  const replacement = oldActivity => ({
    ...oldActivity,
    secondsSpent: oldActivity.secondsSpent + intervalTime,
    lastUpdate: today.valueOf(),
  })

  return findReplace(oldActivities, isNewActivity, replacement, notFound)
}

const getCurrentActivities = async () => {
  const newActivity = await activeWin()
  activities = updateActivity(activities, newActivity)
}

const startRecordActivities = () => {
  if (interval) {
    destruction()
  }
  interval = setInterval(getCurrentActivities, intervalTime * 1000)
}

const setActivities = newActivities => {
  activities = newActivities
}

const getActivities = () => {
  return activities
}

const destruction = () => {
  clearInterval(interval)
}

export default {
  setActivities,
  getActivities,
  destruction,
  startRecordActivities,
}
