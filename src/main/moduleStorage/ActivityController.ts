import dataStoreProvider from 'main/moduleStorage/createStore'
import { getToday } from 'main/utils'

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
}

export default ActivityController
