import dataStoreProvider from 'main/moduleStorage/createStore'
import { getToday } from 'main/utils'

class CommonController {

  private db: any

  constructor(entityName: string) {
    this.db = dataStoreProvider.createDataStore(entityName)
  }

  update = async (data: any[]) => {
    await this.db.remove({}, { multi: true })
    this.db.insert(data)
  }

  get = async <T>(): Promise<T> => {
    return this.db
      .cfind()
      .sort({ id: -1 })
      .exec()
  }
}

export default CommonController
