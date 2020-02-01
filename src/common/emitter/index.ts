import { ActionsTypes, Emitter, EmitterProps, HandlerType } from './type'

// TODO: Need added test
const createEmitter = <T extends ActionsTypes>(props: EmitterProps<T>): Emitter<T> => {
  const { send, on, actions } = props
  const handle = (actionName: keyof T, handler: HandlerType) => {
    const resolve = (payload: any) => {
      send(actions[actionName].SUCCESS, payload)
    }

    const reject = (payload: any) => {
      send(actions[actionName].FAILURE, payload)
    }

    // TODO: maybe need use return instead resolve
    on(actions[actionName].REQUEST, (event: any, payload: any) => {
      handler({ payload, resolve, reject })
    })
  }

  const handleSend = (actionName: keyof T, payload?: any): Promise<any> => {
    send(actions[actionName].REQUEST, payload)

    return new Promise((resolve, reject) => {
      on(actions[actionName].SUCCESS, (event: any, payload: any) => {
        resolve(payload)
      })
      on(actions[actionName].FAILURE, (event: any, payload: any) => {
        reject(payload)
      })
    })
  }

  return { handle, handleSend }
}

export default { createEmitter }
