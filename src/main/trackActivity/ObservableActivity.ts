import { IActivity } from 'common/types/domain'
import TrackActivities from './trackActivities'

export interface IObserver {
  update: (activity: IActivity) => void
}

/**
 * It is implementation pattern Observer
 */
export class ObservableActivity {
  private observers: IObserver[] = []

  constructor() {
    TrackActivities.subscribe((activity: IActivity) => {
      this.observers.forEach(observer => {
        observer.update(activity)
      })
    })
  }

  subscribe = (observer: IObserver) => {
    this.observers.push(observer)
  }

  destroy = () => {
    TrackActivities.destroy()
  }
}
