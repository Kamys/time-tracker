import {show, hide} from 'redux-modal';

import {store} from './index';
import { ModalName } from "renderer/modals/constants";
import { bindModuleAction } from "renderer/store/utils";
import { GroupActions } from "renderer/page/Groups/actions";

export const bindActionToStore = action => store.dispatch(action);

export const GlobalAction = {
    showModal: (name: ModalName) => bindActionToStore(show(name)),
    hideModal: (name: ModalName) => bindActionToStore(hide(name)),
    group: bindModuleAction(GroupActions, store.dispatch)
}
