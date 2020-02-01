import { IObserver } from 'main/trackActivity'
import { IActivity } from 'common/types/domain'
import { Emitter } from 'common/emitter/type'
import { ActionsElectronStrings } from 'common/emitter/events'

export class ObserverRenderer implements IObserver {

  private emitter: Emitter<typeof ActionsElectronStrings>

  constructor(emitter: Emitter<typeof ActionsElectronStrings>) {
    this.emitter = emitter
  }

  update = (activity: IActivity) => {
    this.emitter.handleSend('addActivity', activity)
  }
}
