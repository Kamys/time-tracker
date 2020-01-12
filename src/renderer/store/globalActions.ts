import { show, hide } from 'redux-modal'

import { ModalName } from 'renderer/modals/constants'
import { bindModuleAction } from 'renderer/store/utils'
import { ActionsGroup } from 'renderer/groups/actions'
import { ActionsEntries } from 'renderer/entries/actions'
import { ActionsElectron } from 'renderer/electron/actions'
import { store } from './index'

export const bindActionToStore = action => {
  store.dispatch(action)
}

export const GlobalAction = {
  showModal: (name: ModalName, props?: object) =>
    bindActionToStore(show(name, props)),
  hideModal: (name: ModalName) => bindActionToStore(hide(name)),
  entries: bindModuleAction(ActionsEntries, bindActionToStore),
  group: bindModuleAction(ActionsGroup, bindActionToStore),
  electron: bindModuleAction(ActionsElectron, bindActionToStore),
}

export type TypeGlobalAction = typeof GlobalAction
