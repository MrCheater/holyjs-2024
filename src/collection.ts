export type MapFunctions<
  TKey extends string | number,
  TDeclarations extends Record<TKey, [readonly unknown[], unknown]>
> = {
  [T in keyof TDeclarations]: (
    ...args: TDeclarations[T][0]
  ) => TDeclarations[T][1]
}

