export type ISplit<
  TString extends string,
  TDelimiter extends string
> = TDelimiter extends ""
  ? never
  : TString extends ""
  ? [""]
  : TString extends `${infer T}${TDelimiter}${infer U}`
  ? [T, ...ISplit<U, TDelimiter>]
  : [TString]

export const split = <TString extends string, TDelimiter extends string>(
  str: TString,
  delimiter: TDelimiter
) => str.split(delimiter) as ISplit<TString, TDelimiter>
