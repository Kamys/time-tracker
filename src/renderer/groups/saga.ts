import { all, takeEvery } from 'redux-saga/effects';
import { GlobalAction } from 'renderer/store/globalActions';
import { ModalName } from 'renderer/modals/constants';
import { ActionsGroup } from 'renderer/groups/actions';

function handler() {
    return function* loading(action) {
        yield GlobalAction.hideModal(ModalName.FormGroup);
    };
}

function* watcher() {
    const {create} = ActionsGroup;
    yield all([
        takeEvery(create(null).type, handler()),
    ]);
}

export default [watcher];
