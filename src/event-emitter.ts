export class EventEmitter<
  TEvents extends Record<string, Record<string, unknown>>
> {
  emit<TName extends keyof TEvents>(
    name: TName,
    params: TEvents[TName]
  ): void {}
  subscribe<TName extends keyof TEvents>(
    name: TName,
    listener: (params: TEvents[TName]) => void
  ): void {}
  unsubscribe<TName extends keyof TEvents>(
    name: TName,
    listener: (params: TEvents[TName]) => void
  ): void {}
}
