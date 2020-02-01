export type AsyncAction = {
    REQUEST: string
    SUCCESS: string
    FAILURE: string
}

type HandlerProps = {
    payload: any
    resolve: (payload?: any) => void
    reject: (payload?: any) => void
}

type ListenerType = (event: any, payload: any) => void

export type Emitter<T> = {
    handle: (actionName: keyof T, handler: HandlerType) => void,
    handleSend: (actionName: keyof T, payload?: any) => Promise<any>
}

export type EmitterProps<T> = {
    send: (actionName: keyof T, payload: any) => void
    on: (actionName: keyof T, listener: ListenerType) => void
    actions: T
}

export type HandlerType = (props: HandlerProps) => any

export type ActionsTypes = {
    [key: string]: AsyncAction
}
