import dataStoreProvider from 'main/moduleStorage/createStore'
import { getToday } from 'main/utils'
import { IActivity } from 'common/types/domain'

class ActivityController {
  private db: any
  private today = getToday()

  constructor() {
    this.db = dataStoreProvider.createDataStore('activity')
  }

  update = async (data: any[], date: string = this.today) => {
    await this.db.remove({ date }, { multi: true })
    this.db.insert(data)
  }

  get = async <T>(date: string = this.today): Promise<T> => {
    return this.db
      .cfind({ date })
      .sort({ lastUpdate: -1 })
      .exec()
  }

  addActivity = async <T>(newActivity: IActivity): Promise<T> => {
    const activity = await this.db.findOne({ title: newActivity.title })

    if (!activity) {
      return this.db.insert(newActivity)
    }

    return this.db.update(
      { title: activity.title },
      {
        $inc: { secondsSpent: 1 },
        $set: { lastUpdate: new Date().valueOf() },
      },
    )
  }
}

export default ActivityController
