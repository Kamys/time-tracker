import {show, hide} from 'redux-modal';

import {store} from './index';
import { ModalName } from "renderer/modals/constants";
import { bindModuleAction } from "renderer/store/utils";
import { ActionsGroup } from 'renderer/groups/actions';
import { ActionsEntries } from 'renderer/entries/actions';

export const bindActionToStore = action => {
    console.log('action: ', action);
    store.dispatch(action)
};

export const GlobalAction = {
    showModal: (name: ModalName) => bindActionToStore(show(name)),
    hideModal: (name: ModalName) => bindActionToStore(hide(name)),
    entries: bindModuleAction(ActionsEntries, bindActionToStore),
    group: bindModuleAction(ActionsGroup, bindActionToStore),
}

export type TypeGlobalAction = typeof GlobalAction;
