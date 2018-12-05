import { all, put, takeEvery } from 'redux-saga/effects';
import { GroupActions } from 'renderer/page/Groups/actions';
import { GlobalAction } from 'renderer/store/globalActions';
import { ModalName } from 'renderer/modals/constants';

function handler({SUCCESS, FAILURE}: any) {
    return function* loading(action) {
        try {
            yield put(SUCCESS({}));
            yield GlobalAction.hideModal(ModalName.FormGroup);
        } catch (e) {
            yield put(FAILURE({}));
        }
    };
}

function* watcher() {
    const {loading, create, remove, update} = GroupActions;
    yield all([
        takeEvery(loading.REQUEST, handler(loading)),
        takeEvery(create.REQUEST, handler(create)),
        takeEvery(remove.REQUEST, handler(remove)),
        takeEvery(update.REQUEST, handler(update)),
    ]);
}

export default [watcher];
