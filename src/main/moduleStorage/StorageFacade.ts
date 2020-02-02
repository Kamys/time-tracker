import ActivityController from './ActivityController'
import CommonController from './CommonController'
import { ObserverDataBase } from 'main/moduleStorage/ObserverDataBase'

enum StoreNames {
  ACTIVITY = 'activity',
  GROUP = 'group',
}

const activity = new ActivityController()
const group = new CommonController(StoreNames.GROUP)
const observerActivity = new ObserverDataBase(activity)

export default {
  activity,
  group,
  observerActivity,
}
