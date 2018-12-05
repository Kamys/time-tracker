import { createActionCreator, IAsyncAction } from "renderer/store/utils";


const createAsyncAction = createActionCreator('GROUP');

const loading = createAsyncAction('LOADING');
const create = createAsyncAction('CREATE');
const remove = createAsyncAction('REMOVE');
const update = createAsyncAction('UPDATE');

export interface IGroupActions {
    loading: IAsyncAction<{}>;
    create: IAsyncAction<{name: string, description: string}>;
    remove: IAsyncAction<{}>;
    update: IAsyncAction<{}>;
}

export const GroupActions: IGroupActions = {
    loading,
    create,
    remove,
    update,
};
