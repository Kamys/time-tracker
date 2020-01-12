import dataStoreProvider from './createStore'
import { getToday } from 'main/utils'

export interface IStore {
  update: (data: any[], date?: string) => void
  get: <T>(date?: string) => Promise<T>
}

const createActivityAdapter = (name: string): IStore => {
  const db = dataStoreProvider.createDataStore(name)

  const today = getToday()

  const update = async (data: any[], date: string = today) => {
    await db.remove({ date }, { multi: true })
    db.insert(data)
  }

  const get = <T>(date: string = today): Promise<T> => {
    return db
      .cfind({ date })
      .sort({ lastUpdate: -1 })
      .exec()
  }

  return {
    update,
    get,
  }
}

const createDefaultAdapter = (name: string): IStore => {
  const db = dataStoreProvider.createDataStore(name)

  const update = async (data: any[]) => {
    await db.remove({}, { multi: true })
    db.insert(data)
  }

  const get = <T>(): Promise<T> => {
    return db
      .cfind()
      .sort({ id: -1 })
      .exec()
  }

  return {
    update,
    get,
  }
}

export default {
  createActivityAdapter,
  createDefaultAdapter,
}
