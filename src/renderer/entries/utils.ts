import { isObject, isArray } from 'lodash'
import { GlobalAction } from 'renderer/store/globalActions'
import { EntriesType } from 'common/types/domain'
import { getEntity } from 'renderer/entries/selectors'

export const mergeArray = (baseArray, newArray) => {
  if (isArray(newArray)) {
    return [...baseArray, ...newArray]
  }

  if (isObject(newArray)) {
    return [...baseArray, newArray]
  }

  throw new Error(
    `Failed mergeArray. Merge value must be object or array. Value type ${typeof newArray}`,
  )
}

export const removeItem = <T>(list: T[], predicate: (T) => boolean): T[] => {
  const index = list.findIndex(predicate)
  console.log('index: ', index)
  if (index <= -1) {
    return list
  }
  return [...list.slice(0, index), ...list.slice(index + 1)]
}

export const useEntries = (
  state,
  entityName: EntriesType,
  entityId: string,
) => {
  const onChange = (id: string, newParams) => {
    GlobalAction.entries.change.REQUEST({ entityName, id, ...newParams })
  }

  const onCreate = newEntity => {
    GlobalAction.entries.create.REQUEST({ entityName, entity: newEntity })
  }

  const onRemove = () => {
    GlobalAction.entries.remove.REQUEST({ entityName, entityId })
  }

  const entity = getEntity(state, entityName, entityId)

  return { onChange, onCreate, onRemove, entity }
}
