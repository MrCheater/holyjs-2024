type IDeepValue<TPath extends string[], TValue> = TPath extends []
  ? TValue
  : TPath extends [infer Key extends string, ...infer Tail extends string[]]
  ? { [k in Key]: IDeepValue<Tail, TValue> }
  : never

export type ISetIn<
  TRecord extends Record<string, unknown>,
  TPath extends [string, ...string[]],
  TValue
> = TRecord & IDeepValue<TPath, TValue>

export const setIn = <
  const TRecord extends Record<string, unknown>,
  const TPath extends [string, ...string[]],
  const TValue
>(
  record: TRecord,
  path: TPath,
  value: TValue
): ISetIn<TRecord, TPath, TValue> => {
  let pointer: any = record
  const keys = path.slice(0, -1)
  const lastKey = path[path.length - 1]!
  for (const key of keys) {
    if (!(key in pointer)) {
      pointer[key] = {}
    }
    pointer = pointer[key]
  }
  pointer[lastKey] = value
  return record as ISetIn<TRecord, TPath, TValue>
}
