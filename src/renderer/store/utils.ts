import { ComplexActionCreator1, createAction } from 'redux-act';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

export interface IAsyncAction<R = {}, S = {}, F = IPayloadError> extends ActionCreatorsMapObject {
    REQUEST: ComplexActionCreator1<R, R>;
    SUCCESS: ComplexActionCreator1<S, S>;
    FAILURE: ComplexActionCreator1<F, F>;
}

export interface IPayloadError {
    error?: string;
}

export const createActionCreator = (moduleName: string) => (actionName: string) => {
    return {
        REQUEST: createAction(`${moduleName}_${actionName}_REQUEST`),
        SUCCESS: createAction(`${moduleName}_${actionName}_SUCCESS`),
        FAILURE: createAction(`${moduleName}_${actionName}_FAILURE`),
    };
};

/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction<T>(moduleActions: T, dispatch: Dispatch): T {
    return Object.entries(moduleActions).reduce((result, [key, value]): T => {
        result[key] = bindActionCreators(value, dispatch);
        return result;
    }, {} as T);
}
