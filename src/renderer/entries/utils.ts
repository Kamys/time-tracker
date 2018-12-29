import {isObject, isArray} from 'lodash';
import { GlobalAction } from 'renderer/store/globalActions';
import { EntriesType } from 'renderer/entries/model';
import { getEntity } from 'renderer/entries/selectors';

export const mergeArray = (baseArray, newArray) => {
    if (isArray(newArray)) {
        return [
            ...baseArray,
            ...newArray,
        ];
    }

    if(isObject(newArray)) {
        return [
            ...baseArray,
            newArray,
        ]
    }

    throw new Error(`Failed mergeArray. Merge value must be object or array. Value type ${typeof newArray}`)
}

export const useEntries = (state, entityName: EntriesType, entityId: string) => {
    const onChange = (id: string, newParams) => {
        GlobalAction.entries.change.REQUEST({entityName, id, ...newParams})
    }

    const onCreate = (newEntity) => {
        GlobalAction.entries.create.REQUEST({entityName, entity: newEntity})
    }

    const entity = getEntity(state, entityName, entityId)

    return {onChange, onCreate, entity}
}
