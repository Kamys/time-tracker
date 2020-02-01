import * as moment from 'moment'
import * as activeWin from 'active-win/lib/linux'

import { ACTIVITY_DATE_FORMAT } from 'common/activity/constants'
import { IActivity } from 'common/types/domain'
import { findReplace } from 'common/utils'

let interval = null
const intervalTime = 1

const formatActivity = (newActivity): IActivity => {
  const today = moment()
  const date = today.format(ACTIVITY_DATE_FORMAT)

  return ({
    id: newActivity.title,
    date,
    title: newActivity.title,
    secondsSpent: intervalTime,
    group: '',
    lastUpdate: today.valueOf(),
  })
}

const subscribe = (update: (activity: IActivity) => void) => {
  if (interval) {
    destroy()
  }
  interval = setInterval(async () => {
    const newActivity = await activeWin()
    update(formatActivity(newActivity))
  }, intervalTime * 1000)
}

const destroy = () => {
  clearInterval(interval)
}

export default {
  destroy,
  subscribe,
}
