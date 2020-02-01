import { IObserver } from 'main/trackActivity'
import { IActivity } from 'common/types/domain'

export class ObserverDataBase implements IObserver {

  constructor() {
  }

  update = (activity: IActivity) => {

  }
}
