import { curry } from 'lodash'
import { AsyncAction } from './type'

export const createActionCreator = (moduleName: string) => {
    return curry(createAsyncActions)(moduleName)
}

const createAsyncActions = (moduleName, actionName: string): AsyncAction => {
    return {
        REQUEST: `${moduleName}_${actionName}_REQUEST`,
        SUCCESS: `${moduleName}_${actionName}_SUCCESS`,
        FAILURE: `${moduleName}_${actionName}_FAILURE`,
    }
}
