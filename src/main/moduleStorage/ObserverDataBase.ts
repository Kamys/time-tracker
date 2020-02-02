import { IObserver } from 'main/trackActivity'
import { IActivity } from 'common/types/domain'
import ActivityController from 'main/moduleStorage/ActivityController'

export class ObserverDataBase implements IObserver {
  private controller: ActivityController

  constructor(activity: ActivityController) {
    this.controller = activity
  }

  update = (activity: IActivity) => {
    this.controller.addActivity(activity)
  }
}
