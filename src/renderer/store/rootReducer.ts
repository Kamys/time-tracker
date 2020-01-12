import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as modal } from 'redux-modal';
import { Action } from 'redux-act';

import entries from 'renderer/entries/reduce';
import { ActionsElectron } from 'renderer/electron/actions';
import { IRootState } from 'common/types/domain';

const appReducers = combineReducers({
    router: routerReducer,
    modal,
    entries,
});

const rootReducer = (state, action: Action<{store: IRootState}>) => {
    if (action.type === ActionsElectron.loadingStore.SUCCESS.toString()) {
        state = action.payload.store;
    }
    return appReducers(state, action);
};

export default rootReducer;
