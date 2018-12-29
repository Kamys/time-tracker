import { ComplexActionCreator1, createAction } from 'redux-act';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import * as _ from 'lodash';

export interface IAsyncAction<R = void, S = void, F = IPayloadError> extends ActionCreatorsMapObject {
    REQUEST: ComplexActionCreator1<R, R>;
    SUCCESS: ComplexActionCreator1<S, S>;
    FAILURE: ComplexActionCreator1<F, F>;
}

export interface IPayloadError {
    error?: string;
}

export const createActionCreator = (moduleName: string): typeCreateAsyncActions => {
    let curry1 = _.curry(createAsyncActions);
    return curry1(moduleName);
}

type typeCreateAsyncActions = <R = void, S = void, F = IPayloadError>(actionName: string) => IAsyncAction<R, S, F>

const createAsyncActions = <R, S, F>(moduleName, actionName: string): IAsyncAction<R, S, F> => {
    return {
        REQUEST: createAction(`${moduleName}_${actionName}_REQUEST`),
        SUCCESS: createAction(`${moduleName}_${actionName}_SUCCESS`),
        FAILURE: createAction(`${moduleName}_${actionName}_FAILURE`),
    };
};

// TODO: maybe possible use map
/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction<T>(moduleActions: T, dispatch: any): T {
    return Object.entries(moduleActions).reduce((result, [key, value]): T => {
        result[key] = bindActionCreators(value, dispatch);
        return result;
    }, {} as T);
}
