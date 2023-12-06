type Entries<T> = {
  [K in keyof T]: Map<K, Set<(params: T[K]) => void>>
}[keyof T]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type IListeners<T> = T extends Record<string, Record<string, unknown>>
  ? UnionToIntersection<Entries<T>>
  : never

type IListener = (params: Record<string, unknown>) => void

export class EventEmitter<
  TEvents extends Record<string, Record<string, unknown>>
> {
  protected _listeners = new Map() as IListeners<TEvents>

  emit<TName extends keyof TEvents>(name: TName, params: TEvents[TName]) {
    const listenersByName = this._listeners.get(name as string)
    if (listenersByName) {
      listenersByName.forEach((listener) => listener(params))
    }
  }

  subscribe<TName extends keyof TEvents>(
    name: TName,
    listener: (params: TEvents[TName]) => void
  ) {
    const listenersByName = this._listeners.get(name as string) ?? new Set()
    listenersByName.add(listener as IListener)
    this._listeners.set(name as string, listenersByName)
  }

  unsubscribe<TName extends keyof TEvents>(
    name: TName,
    listener: (params: TEvents[TName]) => void
  ) {
    const listenersByName = this._listeners.get(name as string)
    if (listenersByName) {
      listenersByName.delete(listener as IListener)
    }
  }
}
