import * as Datastore from 'nedb-promise'
import * as path from 'path'
import { isProduction } from 'common/constant'
import { userDataPath } from './constant'

const getUserDataPath = () => {
  if (isProduction) {
    return path.join(userDataPath, 'appStorage/main')
  }

  return './tmpData'
}

const createDataStore = (name: string): Datastore => {
  const dataPath = getUserDataPath()
  return Datastore({
    filename: path.resolve(dataPath, name),
    autoload: true,
  })
}

export default {
  createDataStore,
}
